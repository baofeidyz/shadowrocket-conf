# shadowrocket-conf

Shadowrocket（小火箭）配置文件及分组规则列表。

## 文件路径

仓库地址：<https://github.com/baofeidyz/shadowrocket-conf>

Raw 文件根路径：

```text
https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/
```

Shadowrocket 主配置订阅地址：

```text
https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/config-by-baofeidyz.conf
```

### 基础配置

| 文件 | 仓库路径 | Raw 完整路径 |
| --- | --- | --- |
| Shadowrocket 主配置 | [`config-by-baofeidyz.conf`](config-by-baofeidyz.conf) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/config-by-baofeidyz.conf> |
| Host 与 URL Rewrite | [`lists/host_and_url_rewrite.conf`](lists/host_and_url_rewrite.conf) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/host_and_url_rewrite.conf> |

### 分组规则

主配置按编号顺序加载规则文件；广告拦截位于最前，自定义优先分流紧随其后，局域网和中国大陆规则靠后，最终兜底规则由主配置提供。

### 广告拦截

主配置在中国大陆直连规则之前加载以下专属广告域名列表，并使用 `REJECT`。这些规则无需安装 HTTPS 解密证书，也不依赖其他 Shadowrocket 模块。

| App | 规则文件 | 当前覆盖 | 限制 |
| --- | --- | --- | --- |
| 哔哩哔哩 | [`lists/ad_bilibili.list`](lists/ad_bilibili.list) | 广告、游戏推广及广告追踪域名 | 信息流、开屏和 Protobuf 广告需模块响应过滤 |
| 什么值得买 | [`lists/ad_smzdm.list`](lists/ad_smzdm.list) | 广告投放及统计域名 | 页面内混排广告需模块响应过滤 |
| 京东 | [`lists/ad_jd.list`](lists/ad_jd.list) | 广告、推广素材及统计域名 | 首页、订单页等混排广告需模块响应过滤 |
| 淘宝 | [`lists/ad_taobao.list`](lists/ad_taobao.list) | 阿里妈妈、直通车及广告统计域名 | 开屏和主 API 内广告需模块响应过滤 |
| 高德地图 | [`lists/ad_amap.list`](lists/ad_amap.list) | 广告、推广素材及广告日志域名 | 搜索、路线和打车页面混排广告需模块响应过滤 |
| 去哪儿 | [`modules/adblock-travel.sgmodule`](modules/adblock-travel.sgmodule) | 开屏广告接口 | 需启用模块和 HTTPS 解密 |
| 携程 | [`modules/adblock-travel.sgmodule`](modules/adblock-travel.sgmodule) | 开屏广告接口 | 需启用模块和 HTTPS 解密；异常时单独关闭旅行模块 |

域名规则只拦截独立广告主机，无法删除与正常内容共用 API 返回的广告字段。后者需要 Shadowrocket 模块、HTTPS 解密和响应脚本。

#### 配置增强广告模块

模块分成两份，便于独立回退：

- 常用 App 增强模块：<https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/modules/adblock-apps.sgmodule>
- 去哪儿/携程旅行模块：<https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/modules/adblock-travel.sgmodule>

配置步骤：

1. 先更新并启用本仓库的主配置，确认上面的域名 `REJECT` 规则已经加载。
2. 打开 Shadowrocket，进入“配置 → 模块”，点击右上角 `+`，分别粘贴上述 Raw 地址并下载。
3. 先只启用“广告净化 · 哔哩哔哩/值得买/京东/淘宝/高德”，确认常用功能正常后，再启用“广告净化 · 去哪儿/携程”。不要同时启用覆盖相同 App 的其他去广告模块。
4. 回到 Shadowrocket 底部的“配置”页，确认本仓库的主配置已经被选中；点击该配置文件最右侧的 `ⓘ` 信息按钮，进入“HTTPS 解密”。此入口不在底部的“设置”页。
5. 在“HTTPS 解密”页面打开开关，再进入“证书”，选择“生成新的 CA 证书”并点击“安装证书”；按系统提示允许下载描述文件。
6. 打开 iOS 系统“设置”。若首页出现“已下载描述文件”，直接进入并安装；若没有显示，则进入“通用 → VPN 与设备管理”，选择刚下载的 Shadowrocket CA 描述文件并安装。
7. 安装后进入 iOS“设置 → 通用 → 关于本机 → 证书信任设置”，在“针对根证书启用完全信任”下找到刚安装的 Shadowrocket CA，为它打开完全信任。
8. 回到 Shadowrocket，确认“配置文件右侧 `ⓘ` → HTTPS 解密”的开关仍已打开、两个模块均显示为已启用，然后重新连接；强制退出目标 App 后重新打开。仍显示旧开屏时，先清理 App 缓存，必要时重新登录或重装 App。

验证时应分别检查首页、搜索、详情、下单/预订、订单和登录。若出现空白页、接口报错或功能缺失：

1. 先关闭对应模块并重新连接 Shadowrocket；旅行类问题只关闭“广告净化 · 去哪儿/携程”。
2. 强制退出 App 后重新打开，确认功能是否恢复。
3. 若恢复，保持该模块关闭并记录 App 版本和异常页面，避免反复重装证书。

安全说明：HTTPS 解密允许 Shadowrocket 查看命中主机名的加密流量。只安装由自己设备上的 Shadowrocket 生成的证书，不要安装他人提供的证书。常用 App 模块引用 `zirawell/R-Store` 的远程去广告脚本，脚本更新可能改变行为；模块不包含会员、付费功能、画质、皮肤或去水印解锁。

| 顺序 | 规则 | 仓库路径 | Raw 完整路径 |
| ---: | --- | --- | --- |
| 00 | 自定义优先规则 | [`lists/custom_priority.list`](lists/custom_priority.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/custom_priority.list> |
| 01 | Siri AI / Apple Intelligence | [`lists/siri_ai.list`](lists/siri_ai.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/siri_ai.list> |
| 01 | HomeKit / 家庭 App 直连白名单 | [`lists/homekit.list`](lists/homekit.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/homekit.list> |
| 01 | Apple / iCloud / Apple Intelligence | [`lists/apple.list`](lists/apple.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/apple.list> |
| 02 | 中国大陆及常用直连域名 | [`lists/china_direct.list`](lists/china_direct.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/china_direct.list> |
| 03 | Google 生态 | [`lists/google.list`](lists/google.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/google.list> |
| 04 | 社交媒体 | [`lists/social_media.list`](lists/social_media.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/social_media.list> |
| 05 | 流媒体及内容服务 | [`lists/streaming_media.list`](lists/streaming_media.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/streaming_media.list> |
| 06 | 开发、云服务及基础设施 | [`lists/developer_cloud.list`](lists/developer_cloud.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/developer_cloud.list> |
| 07 | OpenAI / ChatGPT | [`lists/openai_chatgpt.list`](lists/openai_chatgpt.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/openai_chatgpt.list> |
| 08 | Telegram | [`lists/telegram.list`](lists/telegram.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/telegram.list> |
| 08 | WhatsApp | [`lists/whatsapp.list`](lists/whatsapp.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/whatsapp.list> |
| 08 | Signal | [`lists/signal.list`](lists/signal.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/signal.list> |
| 08 | LINE | [`lists/line.list`](lists/line.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/line.list> |
| 08 | Facebook Messenger | [`lists/messenger.list`](lists/messenger.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/messenger.list> |
| 08 | Discord | [`lists/discord.list`](lists/discord.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/discord.list> |
| 08 | KakaoTalk | [`lists/kakaotalk.list`](lists/kakaotalk.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/kakaotalk.list> |
| 08 | Viber | [`lists/viber.list`](lists/viber.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/viber.list> |
| 08 | Clubhouse | [`lists/clubhouse.list`](lists/clubhouse.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/clubhouse.list> |
| 10 | DNS 泄漏及隐私检测 | [`lists/dns_privacy.list`](lists/dns_privacy.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/dns_privacy.list> |
| 11 | 局域网及中国大陆 | [`lists/lan_china_final.list`](lists/lan_china_final.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/lan_china_final.list> |
| 12 | 其他代理规则 | [`lists/misc_proxy.list`](lists/misc_proxy.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/misc_proxy.list> |

即时通信规则按软件独立维护，每个软件对应一个 list 和一个可单独选择线路的代理组；默认代理组仍可通过“即时通信”统一调整。微信、QQ 等中国大陆服务继续由中国大陆直连规则处理，iMessage 和 FaceTime 归入 Apple 服务。
## 银行规则

银行域名规则按机构拆分，主配置统一按 `DIRECT` 策略加载。域名明细主要参考 [v2fly/domain-list-community](https://github.com/v2fly/domain-list-community) 的中国银行分类，并补充常见全国性银行官网。

| 分类 | 银行 | 仓库路径 | Raw 完整路径 |
| --- | --- | --- | --- |
| 国有大型银行 | 中国工商银行 | [`lists/bank_icbc.list`](lists/bank_icbc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_icbc.list> |
| 国有大型银行 | 中国农业银行 | [`lists/bank_abc.list`](lists/bank_abc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_abc.list> |
| 国有大型银行 | 中国银行 | [`lists/bank_boc.list`](lists/bank_boc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_boc.list> |
| 国有大型银行 | 中国建设银行 | [`lists/bank_ccb.list`](lists/bank_ccb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_ccb.list> |
| 国有大型银行 | 交通银行 | [`lists/bank_bocom.list`](lists/bank_bocom.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_bocom.list> |
| 国有大型银行 | 中国邮政储蓄银行 | [`lists/bank_psbc.list`](lists/bank_psbc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_psbc.list> |
| 全国性股份制银行 | 招商银行 | [`lists/bank_cmb.list`](lists/bank_cmb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cmb.list> |
| 全国性股份制银行 | 上海浦东发展银行 | [`lists/bank_spdb.list`](lists/bank_spdb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_spdb.list> |
| 全国性股份制银行 | 中信银行 | [`lists/bank_citic.list`](lists/bank_citic.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_citic.list> |
| 全国性股份制银行 | 中国光大银行 | [`lists/bank_ceb.list`](lists/bank_ceb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_ceb.list> |
| 全国性股份制银行 | 华夏银行 | [`lists/bank_hxb.list`](lists/bank_hxb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_hxb.list> |
| 全国性股份制银行 | 中国民生银行 | [`lists/bank_cmbc.list`](lists/bank_cmbc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cmbc.list> |
| 全国性股份制银行 | 兴业银行 | [`lists/bank_cib.list`](lists/bank_cib.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cib.list> |
| 全国性股份制银行 | 平安银行 | [`lists/bank_pingan.list`](lists/bank_pingan.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_pingan.list> |
| 全国性股份制银行 | 广发银行 | [`lists/bank_cgb.list`](lists/bank_cgb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cgb.list> |
| 全国性股份制银行 | 浙商银行 | [`lists/bank_czbank.list`](lists/bank_czbank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_czbank.list> |
| 全国性股份制银行 | 恒丰银行 | [`lists/bank_hfbank.list`](lists/bank_hfbank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_hfbank.list> |
| 全国性股份制银行 | 渤海银行 | [`lists/bank_cbhb.list`](lists/bank_cbhb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cbhb.list> |
| 政策性及开发性银行 | 国家开发银行 | [`lists/bank_cdb.list`](lists/bank_cdb.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_cdb.list> |
| 政策性及开发性银行 | 中国进出口银行 | [`lists/bank_eximbank.list`](lists/bank_eximbank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_eximbank.list> |
| 政策性及开发性银行 | 中国农业发展银行 | [`lists/bank_adbc.list`](lists/bank_adbc.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_adbc.list> |
| 城市商业银行 | 北京银行 | [`lists/bank_beijing.list`](lists/bank_beijing.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_beijing.list> |
| 城市商业银行 | 上海银行 | [`lists/bank_shanghai.list`](lists/bank_shanghai.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_shanghai.list> |
| 城市商业银行 | 南京银行 | [`lists/bank_nanjing.list`](lists/bank_nanjing.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_nanjing.list> |
| 城市商业银行 | 威海银行 | [`lists/bank_weihai.list`](lists/bank_weihai.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_weihai.list> |
| 在华外资银行 | 汇丰银行中国 | [`lists/bank_hsbc_china.list`](lists/bank_hsbc_china.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_hsbc_china.list> |
| 在华外资银行 | 花旗银行中国 | [`lists/bank_citibank_china.list`](lists/bank_citibank_china.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_citibank_china.list> |
| 民营银行 | 天津金城银行 | [`lists/bank_kincheng.list`](lists/bank_kincheng.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_kincheng.list> |
| 民营银行 | 上海华瑞银行 | [`lists/bank_huarui.list`](lists/bank_huarui.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_huarui.list> |
| 民营银行 | 浙江网商银行 | [`lists/bank_mybank.list`](lists/bank_mybank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_mybank.list> |
| 民营银行 | 温州民商银行 | [`lists/bank_wenzhou_minshang.list`](lists/bank_wenzhou_minshang.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_wenzhou_minshang.list> |
| 民营银行 | 深圳前海微众银行 | [`lists/bank_webank.list`](lists/bank_webank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_webank.list> |
| 民营银行 | 湖南三湘银行 | [`lists/bank_sanxiang.list`](lists/bank_sanxiang.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_sanxiang.list> |
| 民营银行 | 重庆富民银行 | [`lists/bank_fumin.list`](lists/bank_fumin.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_fumin.list> |
| 民营银行 | 四川新网银行 | [`lists/bank_xwbank.list`](lists/bank_xwbank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_xwbank.list> |
| 民营银行 | 北京中关村银行 | [`lists/bank_zhongguancun.list`](lists/bank_zhongguancun.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_zhongguancun.list> |
| 民营银行 | 吉林亿联银行 | [`lists/bank_yillion.list`](lists/bank_yillion.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_yillion.list> |
| 民营银行 | 武汉众邦银行 | [`lists/bank_wuhanz.list`](lists/bank_wuhanz.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_wuhanz.list> |
| 民营银行 | 福建华通银行 | [`lists/bank_onebank.list`](lists/bank_onebank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_onebank.list> |
| 民营银行 | 威海蓝海银行 | [`lists/bank_wegobank.list`](lists/bank_wegobank.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_wegobank.list> |
| 民营银行 | 江苏苏商银行 | [`lists/bank_suning.list`](lists/bank_suning.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_suning.list> |
| 民营银行 | 梅州客商银行 | [`lists/bank_hakka.list`](lists/bank_hakka.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_hakka.list> |
| 民营银行 | 安徽新安银行 | [`lists/bank_xinan.list`](lists/bank_xinan.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_xinan.list> |
| 民营银行 | 辽宁振兴银行 | [`lists/bank_newup.list`](lists/bank_newup.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_newup.list> |
| 民营银行 | 江西裕民银行 | [`lists/bank_yumin.list`](lists/bank_yumin.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_yumin.list> |
| 民营银行 | 无锡锡商银行 | [`lists/bank_xishang.list`](lists/bank_xishang.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/bank_xishang.list> |
