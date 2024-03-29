export const applicantTypes = [
  {
    label: '法人',
    value: '1',
    children: [
      {
        label: '学校',
        value: '1-0'
      },
      {
        label: '研究机构',
        value: '1-1'
      },
      {
        label: '旅行社',

        value: '1-2'
      },
      {
        label: '非旅行社企业',
        value: '1-3'
      },
      {
        label: '协会',
        value: '1-4'
      },
      {
        label: '公益机构',
        value: '1-5'
      },
      {
        label: '其他',
        value: '1-6'
      },
      {
        label: '',
        value: '1'
      }
    ]
  },
  {
    value: '2',
    label: '非法人组织',
    children: [
      {
        label: '个人独资企业',
        value: '2-0'
      },
      {
        label: '合伙企业',
        value: '2-1'
      },
      {
        label: '其他',
        value: '2-2'
      }
    ]
  },
  {
    label: '个体工商户',
    value: '3'
  },
  {
    label: '个人',
    value: '4'
  }
]
export const peopleSize = ['1-10', '10-50', '50-100', '100人以上']
