// 京东新版 POST 搜索响应广告过滤。
// 安全边界：仅删除数组中带明确广告标记的对象；未知结构、非 JSON 和异常均原样放行。

const body = typeof $response !== "undefined" ? $response.body : "";

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isEnabled(value) {
  if (value === true || value === 1 || value === "1") return true;
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "yes";
}

function isPositiveId(value) {
  if (value === null || typeof value === "undefined") return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized !== "" && normalized !== "0" && normalized !== "false" && normalized !== "null";
}

function isAdType(value) {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return /^(?:ad|ads|advert|advertisement|commercial|sponsor|sponsored|feed_ad|product_ad|search_ad)(?:[_-]|$)/.test(normalized);
}

function hasDirectAdMarker(object) {
  if (!isObject(object)) return false;

  const booleanKeys = [
    "isAd", "is_ad", "isAds", "isAdvert", "isAdvertise", "isAdvertisement",
    "adFlag", "ad_flag", "hasAd", "has_ad", "sponsored", "isSponsored"
  ];
  for (const key of booleanKeys) {
    if (Object.prototype.hasOwnProperty.call(object, key) && isEnabled(object[key])) return true;
  }

  const idKeys = ["adId", "ad_id", "advertId", "advert_id", "creativeId", "creative_id"];
  for (const key of idKeys) {
    if (Object.prototype.hasOwnProperty.call(object, key) && isPositiveId(object[key])) return true;
  }

  const typeKeys = ["adType", "ad_type", "itemType", "item_type", "bizType", "biz_type", "cardType", "card_type", "type"];
  for (const key of typeKeys) {
    if (Object.prototype.hasOwnProperty.call(object, key) && isAdType(object[key])) return true;
  }

  return false;
}

function hasNestedAdMarker(value, depth) {
  if (depth > 3 || !isObject(value)) return false;
  if (hasDirectAdMarker(value)) return true;

  // 不跨数组向下判断，避免某个分区里含一条广告时误删整个分区；数组会由 clean() 逐项处理。
  const children = Object.values(value);
  for (const child of children) {
    if (isObject(child) && hasNestedAdMarker(child, depth + 1)) return true;
  }
  return false;
}

function clean(value, state, depth) {
  if (depth > 40 || state.visited > 50000) return value;
  state.visited += 1;

  if (Array.isArray(value)) {
    const result = [];
    for (const item of value) {
      if (isObject(item) && hasNestedAdMarker(item, 0)) {
        state.removed += 1;
        continue;
      }
      result.push(clean(item, state, depth + 1));
    }
    return result;
  }

  if (!isObject(value)) return value;
  for (const key of Object.keys(value)) value[key] = clean(value[key], state, depth + 1);
  return value;
}

try {
  if (!body) {
    $done({});
  } else {
    const parsed = JSON.parse(body);
    const state = { removed: 0, visited: 0 };
    const cleaned = clean(parsed, state, 0);
    if (state.removed > 0) {
      console.log(`[JD-Search-AdFilter] removed=${state.removed}`);
      $done({ body: JSON.stringify(cleaned) });
    } else {
      $done({});
    }
  }
} catch (error) {
  console.log(`[JD-Search-AdFilter] pass-through: ${error.message}`);
  $done({});
}
