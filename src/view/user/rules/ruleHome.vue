<template>
  <div class="ruleHome">
    <div class="card">
      <div class="title">
        <img class="img" src="../../../assets/icon/edit.svg" alt="">
        <span class="text">营探 · 规则协议</span>
      </div>
      <div class="tip">
        <span>{{ titles.length < 10 ? '0' + titles.length : titles.length }} 文档</span>
      </div>
      <div class="line">
        <span>规则协议 | Rule protocol</span>
      </div>
      <div class="bar">
        <img src="../../../assets/icon/fog.svg" alt="">
        <span class="text">
          规则是合作的基础 <span>|</span> 信任是合作的关键要素
        </span>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in titles" :key="item.title" @click="handlerToDetail(item.index)">
          <div class="left">
            <div class="tip" v-show="index + 1 == titles.length">
              <div>new</div>
            </div>
            <div class="l-title">{{ index + 1 < 10 ? '0' + (index + 1) : index }} | {{ item.title }}-保险-规则协议</div>
                <div class="l-desc">{{ item.desc }}</div>
                <div class="l-date">{{ item.date }}</div>
            </div>
            <div class="right">
              <img src="../../../assets/icon/Group-110.svg" alt="">
              <span class="text">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const titles = ref([
  {
    title: '营探风险告知书',
    desc: '营探作为电子商务平台经营者，向营探服务商（以下简称服务商或您）提供网络经营场所、交易撮合、信息发布等基础服务及增值服务。为了使服务商充分了解使用营探平台服......',
    date: '2022-01-27',
    index: '00'
  },
  {
    title: '营探安全手册',
    desc: '1. 为认真贯彻落实《中华人民共和国旅游法》等相关法律法规，更好地维护营探消费者及出行人（以下简称您）、服务商及营探平台（以下简称营探或本平台）的合法权利......',
    date: '2023-03-22',
    index: '01'
  },
  {
    title: '营探安全须知',
    desc: '1. 为认真贯彻落实《中华人民共和国旅游法》等相关法律法规，更好地维护营探消费者及出行人（以下简称您）、服务商及营探平台（以下简称营探或本平台）的合法权利......',
    date: '2023-03-31',
    index: '02'
  },
  {
    title: '营探帮助中心',
    desc: '一、账号与安全 1.账号如何注册？ 请登录Camptogo APP/微信小程序，通过手机号一键登录进行注册。2.账号如何注销？微信小程序：目前微信小程序不支持账户注销......',
    date: '2023-06-12',
    index: '03'
  },
  {
    title: '营探免责声明',
    desc: '营探平台（以下简称营探或本平台）提醒营探消费者（以下简称您）：在使用营探服务之前，请您审慎阅读本声明，并确保完全同意本声明。为保障您的权益，请您务必仔.......',
    date: '2022-08-27',
    index: '04'
  },
  {
    title: '营探用户协议',
    desc: '感谢您使用营探服务。在使用营探服务之前，请您审慎阅读本协议，并确保完全同意本协议条款。营探用户协议》（以下简称本协议）是用户（以下简称用户或您）与【北.......',
    date: '2023-02-27',
    index: '10'
  },
  {
    title: '营探隐私政策',
    desc: '欢迎用户（以下简称您）使用营探服务。在使用营探服务之前，请您审慎阅读本协议，并确保完全同意本协议条款。【北京光荷文化科技有限公司及其关联公司】作为营探.......',
    date: '2023-02-27',
    index: '11'
  },
  {
    title: '营探优惠券使用规则',
    desc: '营探（www.camptogo.com）优惠券（以下简称优惠券）是营探联合服务商对广大消费者的一种优惠和回馈。为使更多的消费者享受到这种优惠，特制定《营探优惠券使.......',
    date: '2024-01-21',
    index: '12'
  },
  {
    title: '营探预订和退费须知',
    desc: '营探平台（以下简称营探或本平台）展示的商品由入驻营探的服务商直接提供，服务商通过营探平台推出全方位的商品和服务，并负责营销销售、资源确认、合同签署.......',
    date: '2024-01-14',
    index: '13'
  },
  {
    title: '营探服务商入驻须知',
    desc: '1. 营探平台（以下简称营探或本平台）秉承透明公开、合作共赢的原则，致力于与服务商建立长远可持续发展的合作关系。北京光荷文化科技有限公司及其关联公司.......',
    date: '2023-06-05',
    index: '14'
  },
  {
    title: '营探诚信保证金管理规定',
    desc: '平台设立诚信保证金用于加强营探平台管理，防范交易风险，保障服务商与营探平台用户的合法权益。为规范平台及服务商双方行为，明确诚信保证金的管理办法，特.......',
    date: '2023-01-21',
    index: '15'
  },
  {
    title: '营探平台特色',
    desc: '舒适体验 信息方案 多维信息披露 营探致力于打造一个信息披露全面的预订平台，以帮助您快速找到感兴趣的活动，与志同道合的伙伴高效地、有品质地度过您的闲.......',
    date: '2023-02-27',
    index: '16'
  },
  {
    title: '营探知识产权声明',
    desc: '第一章 免责声明 营探平台（以下简称营探或本平台）提供的信息及内容全部按原样提供，营探不作任何明示或暗示的保证。本平台的转载内容皆出于传递更多信息之.......',
    date: '2024-01-21',
    index: '17'
  },
  {
    title: '营探账户注销协议',
    desc: '在您注销您的账户之前，请认真阅读、理解并同意营探账户注销协议（以下简称本协议）的所有内容。当您按照注销流程填写或提供信息、阅读并同意本协议及相关条.......',
    date: '2022-08-27',
    index: '18'
  },
  {
    title: '营探服务商管理办法',
    desc: '为维护正常运营秩序，建立健康规范的电子商务平台，保障营探消费者合法权益，营探平台（以下简称我们或营探或平台）制定本管理办法。本规则适用于成为营探.......',
    date: '2024-01-21',
    index:'20'
  },
  {
    title: '营探服务商收费标准',
    desc: '为规范营探及服务商行为，充分调动服务商积极性，促进营探平台健康发展，保护服务商、消费者及营探平台的合法权益，依据国家法律法规及营探发展规划，指定本办法。 .......',
    date: '2024-01-21',
    index:'21'
  },
  {
    title: '营探服务商培训办法',
    desc: '为帮助服务商、更高效的使用营探平台（以下简称营探或本平台），为提高服务商服务水平，并维护消费者的相关合法权益，营探制定本培训办法。......',
    date: '2022-08-27',
    index:'23'
  },
  {
    title: '营探搜索排名规则',
    desc: '营探搜索与排名规则是将匹配关键词的商品按照对消费者需求满足程度依次展示，目的是帮助消费者快速方便地找到所需商品。此外，消费者还可以按.......',
    date: '2022-08-27',
    index:'24'
  },
  {
    title: '营探信用评价规则',
    desc: '为响应建立信用社会的国家号召，建立有利于电商行业健康发展的信用体系、增强入驻营探平台服务商（以下简称服务商）的诚信意识、鼓励服务商为.......',
    date: '2022-08-27',
    index:'25'
  },
  {
    title: '营探交易争议处理规则',
    desc: ' 为保护交易双方当事人的合法权益，维护营探平台（以下简称本平台或营探）的正常运营秩序，依据《营探服务商入驻协议》《营探服务商管理.......',
    date: '2022-02-27',
    index:'26'
  },
  {
    title: '营探侵权处理办法',
    desc: '针对营探平台（以下简称本平台或营探）上已经或可能出现的侵权行为，营探根据我国法律法规制定本办法。任何主体（包括但不限于个人、公.......',
    date: '2022-02-24',
    index:'27'
  },
  {
    title: '价格说明',
    desc: '本价格为含税价，包含出行人在活动期间的食宿费用、项目体验费、课程师资费、场地费、教具物资费等，具体内容以该商品详情页为准。.......',
    date: '',
    index:'28'
  },
  {
    title: '退改说明',
    desc: '该商品为 有条件退商品 详见:《营探平台预订和退费须知》对于“有条件退订”的商品，您须重点阅读商品详情中的退订规则。自订单生效.......',
    date: '',
    index:'29'
  },
  {
    title: '天安财产保险股份有限公司',
    desc: '组织者责任保险条款 （注册号：C00002230912020033004492）总则 第一条 本保险合同由保险条款、投保单、保险单、保险凭证以及.......',
    date: '2022-08-27',
    index:'31'
  },
  {
    title: '附加旅行突发性疾病身故保险条款',
    desc: '总则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简称.......',
    date: '',
    index:'32'
  },
  {
    title: '附加旅行医疗费用保险条款',
    desc: '总则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简.......',
    date: '',
    index:'33'
  },
  {
    title: '附加旅行住院津贴保险条款',
    desc: '总则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简.......',
    date: '',
    index:'34'
  },
  {
    title: '附加高风险运动意外伤害保险条款',
    desc: '总则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简.......',
    date: '',
    index:'35'
  },
  {
    title: '附加旅行公共交通工具意外伤害保险条款',
    desc: '总则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简.......',
    date: '',
    index:'37'
  },
  {
    title: '附加食物中毒保险条款',
    desc: '总则 第一条  投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简称为“本附加条款”）。.......',
    date: '',
    index:'38'
  },
  {
    title: '天安财产保险股份有限公司',
    desc: '附加救护车费用保险条款 （(天安财险)(备-其他)【2020】(附) 020 号）总 则 第一条 合同构成本条款是意外险类主险合同的附加险条款。本附加险合同.......',
    date: '',
    index:'39'
  },
  {
    title: '营探隐私政策简明版',
    desc: '提示条款 北京光荷文化科技有限公司及其关联公司作为营探平台（以下简称我们或营探）运营者，非常重视保护营探用户（以下简称您）的隐私和个人信息安全。《营探隐私政策.......',
    date: '2022-08-27',
    index:'19'
  },
  {
    title: '第三方合作清单',
    desc: '提示条款 为保障营探平台安全稳定的运行或实现相关功能，营探平台会嵌入由第三方提供的的软件工具开发包（以下简称“SDK”）或类似其他应用程序实现前述目的。我们会对第三方获.......',
    date: '2024-01-21',
    index:'110'
  },
  {
    title: '营探服务商入驻协议及授权条款',
    desc: '甲方： 统一社会信用代码：法定代表人/经营者/执行事务合伙人：注册地址/经营场所：单位有效通讯地址：注册手机：注册邮箱：乙方：北京光荷文化科技有限公司社会信用代码：9111010.......',
    date: '',
    index:'111'
  },
  {
    title: '营探服务商入驻协议及授权条款',
    desc: '甲方： 居民身份证号码：有效通讯地址：注册手机：注册邮箱：乙方：北京光荷文化科技有限公司社会信用代码：91110108MA01ADFX3L 法定代表人：闫娜单位有效通讯地址：北京市.......',
    date: '',
    index:'112'
  },
  {
    title: '常见问题',
    desc: '是否有报名条件？请您仔细阅读商品详情中的报名条件，并确保出行者满足该活动的报名条件。出行人需身体健康，并具有一定独立能力，不存在重大健康隐患，不存在导致无法参.......',
    date: '',
    index:'210'
  },
  {
    title: '预订须知',
    desc: '*该商品为有条件退订商品 预定限制 出于安全考虑，确保出行人的健康素质、年龄、生活能力等身体条件符合商品和服务的相关要求，不存在超过招生年龄、身体条件不允许、有特殊疾.......',
    date: '',
    index:'211'
  },
  {
    title: '儿童隐私保护声明及监护人须知',
    desc: '引言 营探平台（以下简称营探或我们）致力于保护使用营探商品和服务的儿童的个人信息，《儿童隐私保护声明及监护人须知》（以下简称本声明）旨在向监护人（以下简称您）和儿童说明营探如何收集、使用、保.......',
    date: '2024-01-21',
    index:'212'
  },
  {
    title: '营探敏感个人信息清单',
    desc: '第一章 处理原则 1.1 安全审慎原则：出于对敏感个人信息的特殊保护，仅在根据法律法规要求和提供相关功能所需时，我们才会申请处理敏感个人信息，并采取严格的安全保护措施。1.2 知情决定原则：我们将通过《营探隐私政策》.......',
    date: '2024-01-21',
    index:'213'
  },
  {
    title: '应用权限申请与使用情况说明',
    desc: '提示条款 本文件适用版本号：iOS 1.0，小程序1.0及此后更新版本 1、为保障营探功能实现与安全稳定运行之目的，我们可能会申请或使用操作系统的相关权限。2、为保障您的知情权，我们通过下列.......',
    date: '2022-08-27',
    index:'214'
  },
  {
    title: '个人信息收集清单',
    desc: '提示条款 我们会收集您在使用服务时主动提供的、通过自动化手段收集您在使用功能或接受服务过程中产生的下述信息。对于涉及未成年人及儿童的信息，我们认为您同意《营探隐私政策》即已阅读并同意《营探儿童隐私保护.......',
    date: '2024-01-21',
    index:'215'
  },
  {
    title: '附加旅行个人责任及宠物责任保险',
    desc: '总 则 第一条 投保人只有在投保了《旅游者人身意外伤害险条款》等旅游类险种（以下简称为“主险”）后，方可投保本附加条款（以下简称为“本附加条款”）。本附加条款与主保险合同条款不一致之处，以本附加条.......',
    date: '',
    index:'310'
  },
  {
    title: '自由职业者服务协议',
    desc: '鉴于: 1.甲方是一家依照中国法律设立的有限责任公司，为【场景化灵活用工服务平台】（“【灵活用工平台】”）的运营方。2.乙方（下称“乙方”或“您”）是一名具有完全民事行为能力的中国籍自然人。.......',
    date: '',
    index:'311'
  },
  {
    title: '灵活就业服务合作协议',
    desc: '特别声明： 为免疑义，本协议项下的新就业形态劳动者仅限于从事生产经营活动的个人或本协议项下的个体工商户，与其名下注册的其他个体工商户没有任何关系，同时该新就业形态劳动者与甲方（含关联方）不.......',
    date: '',
    index:'312'
  },
  {
    title: '营探推荐官返现活动规则',
    desc: '一、活动规则 1.  活动时间：2023年6月1日0时至2023年8月31日24时。2.  推荐规则：推荐人须注册成为营探用户并在活动期间协助营探平台邀请新用户，新用户作为推荐人的被邀请人在注册之日起3个月内完成.......',
    date: '',
    index:'313'
  }
])
const handlerToDetail = (index)=>{
  if(index)
  router.push(`/user/rule/${index}`)
}
</script>

<style lang="scss" scoped>
.ruleHome {
  width: 100%;
  background-color: rgb(252, 252, 252);
  display: flex;

  .card {
    margin: 30px auto;
    width: 80%;
    min-height: 90vh;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    padding: 30px 50px;
    display: flex;
    flex-direction: column;

    .title {
      display: flex;
      margin: 0 auto 0 0;
      height: 40px;
      line-height: 40px;

      .img {
        width: 40px;
        height: 40px;
      }

      .text {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        margin: auto 10px;

      }
    }

    .tip {
      margin: 0 auto 0 0;
      margin: 8px 0;
      padding-left: 52px;
      font-size: 14px;
      font-family: 'PingFang SC';
      font-weight: 400;
      color: #888;
    }

    .line {
      height: 30px;
      line-height: 30px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #555;
      border-bottom: 2px solid #d8d8d8;
    }

    .bar {
      width: 100%;
      height: 42px;
      background-color: #93D500;
      margin: 21px 0;
      display: flex;

      img {
        width: 50px;
        height: 40px;
        margin: auto 20px;
      }

      .text {
        margin: auto 0;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 350;
        font-size: 20px;
        color: #FFFFFF;

        span {
          font-weight: 500 !important;
        }
      }
    }

    .items {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;

      .item {
        width: 100%;
        height: 130px;
        border-radius: 10px;
        border: 1px solid rgb(184, 184, 184);
        margin: 10px 0;
        display: flex;
        overflow: hidden;
        user-select: none;
        cursor: pointer;

        .left {
          width: 75%;
          height: 104px;
          display: flex;
          flex-direction: column;
          font-family: 'PingFang SC';
          padding: 18px 0;
          position: relative;

          .tip {
            display: flex;
            position: absolute;
            top: -3px;
            left: -42px;

            div {
              background-color: #93D500;
              color: #fff;
              border-radius: 8px;
              height: 12px;
              line-height: 12px;
              font-size: 8px;
              padding: 0 5px;
              margin: auto 0;
              text-align: center;
            }
          }

          .l-title {
            font-size: 16px;
            width: 100%;
            height: 20px;
            margin: 0 12px auto 12px;
          }

          .l-desc {
            font-size: 14px;
            color: #666;
            height: 30px;
            margin: auto 12px;
          }

          .l-date {
            height: 20px;
            font-size: 14px;
            color: #888;
            margin: auto 12px 0 12px;
          }
        }

        .right {
          width: 25%;
          height: 100%;
          background-color: rgb(247, 247, 247);
          border-left: 1px solid rgb(184, 184, 184);
          display: flex;
          position: relative;
          user-select: none;

          img {
            margin: auto;
            width: 80%;
            height: 85%;
          }

          .text {
            position: absolute;
            left: 50%;
            top: 45%;
            color: #FFFFFF;
            transform: translate(-50%) rotate(-1.5deg);
            font-weight: 400;
            font-size: 12px;
            font-family: 'PingFang SC';

          }
        }
      }
    }
  }
}
</style>