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
    value: 'CAUSE'
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
    label: '亲子营',
    value: '亲子营',
    desc: '【亲子营】指家长陪伴孩子共同参与的，有益于儿童成长的体验式教育形式。'
  },
  {
    label: '亲子单飞营',
    value: '亲子单飞营',
    desc: '【亲子单飞营】指家长与孩子共同参与，有亲子互动环节，也有各自独立安排的体验式教育形式。'
  },
  {
    label: '独立日间营',
    value: '独立日间营',
    desc: '【独立日间营】指孩子短时独立参与的，有益于儿童成长的体验式教育形式。'
  },

  {
    label: '冬夏令营',
    value: '冬夏令营',
    desc: '【夏令营】指在假期期间以团队生活形式参与的，有益于促进生理、心理、社交等能力综合等提升的体验式教育形式。'
  },
  {
    label: '游学',
    value: '游学',
    desc: '【游学】指参与人以游览为主、学习为辅的体验式教育形式。'
  },
  {
    label: '研学',
    value: '研学',
    desc: '【研学】指参与人以研究性学习为主、游览娱乐休闲为辅的体验式教育形式。'
  },

  {
    label: '产融实践',
    value: '产融实践',
    desc: '【产融实践】指参与人根据其已学习掌握的某些特定领域技能和知识，以实践为目标走入实际场景中应用的体验式教育形式。'
  },
  {
    label: '赛事集训',
    value: '赛事集训',
    desc: '【赛事集训】指参与人就某些特定领域以获得竞赛成绩为目标参与的，短期体验式教育形式。'
  },
  {
    label: '其他',
    value: '其他',
    desc: '【其他】不属于上述类型的其他形式活动。'
  }
]
// 保险
const insurenceOptions = [
  {
    label: '自行购买其他保险',
    value: false
  },
  {
    value: true,
    label: '购买与营探合作的第三方保险'
  }
]
const liabilityOptions = [
  {
    label: '自行购买其他保险',
    value: true
  },
  {
    value: false,
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
