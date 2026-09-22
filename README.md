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

主配置按编号顺序加载规则文件；自定义优先规则在最前，局域网和中国大陆规则靠后，最终兜底规则由主配置提供。

| 顺序 | 规则 | 仓库路径 | Raw 完整路径 |
| ---: | --- | --- | --- |
| 00 | 自定义优先规则 | [`lists/custom_priority.list`](lists/custom_priority.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/custom_priority.list> |
| 01 | Siri AI / Apple Intelligence | [`lists/siri_ai.list`](lists/siri_ai.list) | <https://raw.githubusercontent.com/baofeidyz/shadowrocket-conf/refs/heads/main/lists/siri_ai.list> |
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
