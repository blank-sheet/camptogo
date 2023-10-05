// 优势认证
const certifiedFeatures = [
  {
    label: '国际奖项',
    value: 1
  },
  {
    label: '国家奖项',
    value: 2
  },
  {
    label: '省市奖项高级职称',
    value: 3
  },
  {
    label: '中级职称',
    value: 5
  },
  {
    label: '荣誉称号',
    value: 6
  },
  {
    label: '医护保障',
    value: 24
  },
  {
    label: '专家认证',
    value: 14
  },
  {
    label: '自营场地',
    value: 16
  },
  {
    label: '优质场地',
    value: 25
  },
  {
    label: '国际品牌',
    value: 17
  },
  {
    label: '自研课程',
    value: 20
  }
]
// 退改方案
const backOptions = [
  // {
  //   label: '无理由',
  //   value: 0
  // },
  // {
  //   label: '不可退',
  //   value: 1
  // },
  {
    label: '有条件退',
    value: 2
  }
]
// 支持语言
const languages = [
  {
    label: '普通话',
    value: {
      name: '普通话'
    }
  },
  {
    label: '英语',
    value: {
      name: '英语'
    }
  },
  {
    label: '俄语',
    value: {
      name: '俄语'
    }
  },
  {
    label: '日语',
    value: {
      name: '日语'
    }
  },
  {
    label: '西语',
    value: {
      name: '西语'
    }
  },
  {
    label: '泰语',
    value: {
      name: '泰语'
    }
  },
  {
    label: '韩语',
    value: {
      name: '韩语'
    }
  },
  {
    label: '上海话',
    value: {
      name: '上海话'
    }
  },
  {
    label: '粤语',
    value: {
      name: '粤语'
    }
  },
  {
    label: '闽南语',
    value: {
      name: '闽南语'
    }
  },
  {
    label: '陕西话',
    value: {
      name: '陕西话'
    }
  },
  {
    label: '蒙语',
    value: {
      name: '蒙语'
    }
  }
]

// 活动类型
const activityTypes = [
  {
    label: '亲子活动',
    value: '亲子活动',
    desc: '【亲子活动】是指父母陪伴孩子参与有益于儿童成长的组织性活动。'
  },
  {
    label: '营地活动',
    value: '营地活动',
    desc: '【营地活动】是指孩子短时独立参与的有益于儿童成长组织性活动。'
  },
  {
    label: '夏令营',
    value: '夏令营',
    desc: '【夏令营】是在暑期以团队生活形式促进参与者生理心理社交能力等提升的教育活动。'
  },

  {
    label: '冬令营',
    value: '冬令营',
    desc: '【冬令营】是在寒假以团队生活形式促进参与者生理心理社交能力等提升的教育活动。'
  },
  {
    label: '游学',
    value: '游学',
    desc: '【游学】是一种以游览为主的文化体验式教育模式。'
  },
  {
    label: '研学',
    value: '研学',
    desc: '【研学】是围绕研究课题展开研究性学习与旅行体验相结合的教育活动。'
  },

  {
    label: '系列特训',
    value: '系列特训',
    desc: '【系列特训】是通过一系列渐进式训练帮助参与者逐步掌握特定领域技能和知识的活动。'
  },
  {
    label: '赛事活动',
    value: '赛事活动',
    desc: '【赛事活动】是基于竞赛规则组织的短期聚集性活动。'
  },
  {
    label: '其他',
    value: '其他',
    desc: '【其他】不属于上述类型的其他活动。'
  }
]
// 保险
const insurenceOptions = [
  {
    label: '自行购买其他保险',
    value: '自行购买其他保险'
  },
  {
    value: '购买与营探合作的第三方保险',
    label: '购买与营探合作的第三方保险'
  }
]
const liabilityOptions = [
  {
    label: '自行购买其他保险',
    value: '自行购买其他保险'
  },
  {
    value: '购买与营探合作的第三方保险',
    label: '购买与营探合作的第三方保险'
  }
]
const navs = [
  '商品基本信息',
  '课程详情',
  '商品详情',
  '活动日程表',
  '保险信息',
  '购买须知',
  '开营须知'
]
export {
  certifiedFeatures,
  backOptions,
  languages,
  activityTypes,
  liabilityOptions,
  insurenceOptions,
  navs
}
