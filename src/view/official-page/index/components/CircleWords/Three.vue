<template>
  <section class="hp-slide day clearfix hp-slide-3" style="postion: relative">
    <div class="map" :style="mapSize">
      <div class="wordCloud">
        <transition v-for="({ text }, i) of renderData" :key="i" name="fade1">
          <span
            class="wordCloudTag"
            :style="{
              color: color[i % color.length],
              ...renderContentEle[i].style
            }"
            v-if="!renderContentEle[i].hide"
            >{{ text }}</span
          >
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export const viWords = [
  '与世界奇遇',
  '找到所爱',
  '跨界',
  '自然的接触',
  '美的享受',
  '冰山下的特质',
  '优质服务',
  '审美',
  '价值观',
  '跨文化体验',
  '期待感',
  '挖掘潜能',
  '提升自我',
  '国际化成长',
  '博物百科',
  '空间想象力',
  '探索欲',
  '人文知识',
  '成长动力',
  '感知世界',
  '认知自我',
  '综合素质',
  '优质资源',
  '多元场景',
  '趣味学习',
  '社会实践'
]
export const normalWords = [
  'serendipity',
  '热情洋溢',
  '优质休闲时光',
  '发现这个世界',
  '独处',
  '协作',
  '创造',
  '探索',
  '多维立体',
  '团队',
  '自我',
  '1+1>2',
  '角色定位',
  '品质',
  '动机',
  '沉浸',
  '体验',
  '叠加场景',
  'STEAM',
  'PLB',
  '休闲',
  '度假',
  '想象力',
  '思维逻辑',
  '交互',
  '益智活动',
  '生活品味',
  '享受',
  '能力',
  '执行力',
  '行动力',
  '培养',
  '成长',
  '团队',
  '合作',
  '伙伴',
  '独立',
  '自信',
  '世界观',
  '人际',
  '社交',
  '火花',
  '青春',
  '天性',
  '探索',
  '美育',
  '教育',
  '德育',
  '热爱',
  '启蒙',
  '娱乐',
  '游戏',
  '独立',
  '自信',
  '创新',
  '专家',
  '全球',
  '成长',
  '愉悦感',
  '归属感',
  '思维',
  '开拓视野',
  '磨砺意志',
  '品格塑造',
  '创造性',
  '娱乐性',
  '能力培养',
  '生活品位',
  '社会交流',
  '自然探索',
  '兴趣实践',
  '体验式',
  '项目式',
  '服务式',
  '感恩教育',
  '注意力训练',
  '生活习惯',
  '时间管理',
  '抗压受挫',
  '工程能力',
  '逆向思维',
  '观察能力',
  '生存急救',
  '儿童心理',
  '社会体育',
  '学习动力',
  '树立目标',
  '增长见识',
  '户外拓展',
  '激发梦想',
  '生活习惯',
  '时间管理',
  '主题项目',
  '告别拖延',
  '世界公民',
  '学科',
  '外语',
  '语言',
  '自然',
  '人文',
  '科学实验',
  '户外运动',
  '竞赛',
  '国际竞赛',
  '研学',
  '游学',
  '知识',
  '研学游',
  '访学',
  '研游',
  '研学教育',
  '营地',
  '冬令营',
  '夏令营',
  '少儿培训',
  '特训营',
  '暑假',
  '寒假',
  '假期',
  '小长假',
  '周末',
  '素质教育',
  '亲子',
  '兴趣爱好',
  '特长班',
  '留学文书',
  '小语种',
  '出国'
]
export const gStyle =
  (...props) =>
  (...values) => {
    const style = {}
    for (const [index, styleKey] of props.entries()) {
      values[index] && (style[styleKey] = values[index] + 'px')
    }
    return style
  }
export const gSize = gStyle('width', 'height')
export const gSizeAndP = gStyle('width', 'height', 'left', 'top')
export const gReactiveImgAnimation = (width, height, left, top, { size, position } = {}) => ({
  ...gSizeAndP(width, height, left, top),
  'background-size': size,
  'background-position': position
})

const wordWithTag = []
const point = 0
// 卡上下词的位置
normalWords.slice(0, point).forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: i,
    show: false,
    vip: false
  })
})
viWords.forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: point + i,
    show: false,
    vip: true
  })
})
normalWords.slice(point).forEach((r, i) => {
  wordWithTag.push({
    text: r,
    index: i + point + viWords.length,
    show: false,
    vip: false
  })
})
export default {
  data() {
    return {
      data: wordWithTag,
      color: ['#333333', '#487629', '#333333', '#93d500'],
      contentEle: wordWithTag.map(() => ({
        x: 0,
        y: 0,
        z: 0,
        style: {}
      })),
      direction: '-1',
      speed: 1000,
      animateId: 0,
      angle: -0.003,
      space: 50,
      maxAlpha: 0.8,
      maxScale: 2.5,
      scale: { x: 1.2, y: 1.1 }
    }
  },
  name: 'e-pagethree',
  props: ['isPhone', 'ipx', 'hpx', 'wpx', 'fadeIn', 'transform'],
  computed: {
    renderNum() {
      return this.isPhone ? 50 : 60
    },
    renderData() {
      return this.data.slice(0, this.renderNum)
    },
    renderContentEle() {
      return this.contentEle.slice(0, this.renderNum)
    },
    width() {
      return this.isPhone ? window.innerWidth * 0.9 : 1521 * this.ipx * this.scale.x
    },
    height() {
      return this.isPhone ? window.innerHeight * 0.75 : 730 * this.ipx * this.scale.y
    },
    mapSize() {
      return this.isPhone
        ? {}
        : {
            ...gSize(1521 * this.ipx * this.scale.x, 730 * this.ipx * this.scale.y),
            position: 'relative',
            top: '50%',
            'margin-top': 0,
            transform: `translateY(-50%)`
          }
    },
    imgSize() {
      return this.isPhone ? {} : gSize(752 * this.ipx, this.ipx * 728)
    },
    unVisibleR() {
      return this.isPhone ? (window.innerWidth * 0.9 * 0.7) / 2 - 30 : (this.ipx * 640) / 2 - 30
    },
    perspective() {
      return 1000 * Math.max(this.hpx, this.wpx)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    ipx() {
      this.init()
    },
    contentEle() {
      const eles = []
      for (let i = 0; i < this.contentEle.length; i++) {
        const hidden = this.contentEle[i].hide
        if (hidden) {
          eles.push(i)
          this.data[i].show = false
        }
      }
      const originHidden = this.data.filter(r => !r.show)
      this.shuffle(originHidden)
      const vips = originHidden.filter(r => r.vip)
      const normals = originHidden.filter(r => !r.vip)
      let toShowEle = []
      if (this.renderData.filter(r => r.vip).length < this.renderNum * 0.6) {
        toShowEle = [].concat(vips, normals)
      } else {
        toShowEle = [].concat(normals, vips)
      }
      for (let i = 0; i < eles.length; i++) {
        this.data[eles[i]] = toShowEle[i]
        toShowEle[i].show = true
      }
      this.data = this.data.slice()
    }
  },
  methods: {
    gSize,
    gSizeAndP,
    init() {
      window.cancelAnimationFrame(this.animateId)
      const RADIUSX = (this.width - 50) / 2
      const RADIUSY = (this.height - 50) / 2
      this.contentEle = []
      for (let i = 0; i < this.renderData.length; i++) {
        this.data[i].show = true
        const k = -1 + (2 * (i + 1) - 1) / this.renderData.length
        const a = Math.acos(k)
        const b = a * Math.sqrt(this.renderData.length * Math.PI)
        const x = RADIUSX * Math.sin(a) * Math.cos(b)
        const y = RADIUSY * Math.sin(a) * Math.sin(b)
        const z = RADIUSX * Math.cos(a) * 0.9
        const singleEle = {
          x,
          y,
          z,
          style: {}
        }
        this.contentEle.push(singleEle)
      }
      this.animate()
    },
    shuffle(pos) {
      let i = pos.length
      while (i) {
        let j = Math.floor(Math.random() * i--)
        ;[pos[j], pos[i]] = [pos[i], pos[j]]
      }
    },
    animate() {
      this.rotateY()
      this.move()
      this.animateId = window.requestAnimationFrame(this.animate)
    },
    rotateX() {
      const angleX = this.angle
      const cos = Math.cos(angleX)
      const sin = Math.sin(angleX)
      this.contentEle = this.contentEle.map(t => {
        const y1 = t.y * cos - t.z * sin
        const z1 = t.z * cos + t.y * sin
        return {
          ...t,
          y: y1,
          z: z1
        }
      })
    },
    shouldHide(x, y, z) {
      if (z > 0) return false
      if ((x - this.width / 2) ** 2 + (y - this.height / 2) ** 2 < this.unVisibleR ** 2) {
        return true
      } else {
        return false
      }
    },
    rotateY() {
      const angleY = this.angle
      const cos = Math.cos(angleY)
      const sin = Math.sin(angleY)
      this.contentEle = this.contentEle.map((t, i) => {
        const x1 = t.x * cos - t.z * sin
        const z1 = t.z * cos + t.x * sin
        return {
          ...t,
          x: x1,
          z: z1
        }
      })
    },
    move() {
      const CX = this.width / 2
      const CY = this.height / 2
      this.contentEle = this.contentEle.map((singleEle, i) => {
        const { x, y, z } = singleEle
        const RADIUS = (this.width - this.space) / 2
        const scale = this.perspective / (this.perspective - z)
        const alpha = Math.min(((z + RADIUS) / (2 * RADIUS)) ** (z < 0 ? 1.5 : 1.2), this.maxAlpha)
        const left = x + CX - this.space / 2
        const top = y + CY - this.space / 2
        const transform = `translate3d(${left}px, ${top}px,0) scale(${
          (this.isPhone ? 0.8 : 1) * Math.min(scale, this.maxScale).toFixed(2)
        })`
        const hide = this.shouldHide(left, top, z)
        const style = {
          ...singleEle.style,
          opacity: isNaN(alpha) ? 0 : alpha,
          'z-index': hide ? -1 : 0,
          transform
        }
        return {
          x,
          y,
          z,
          style,
          hide
        }
      })
    }
  }
}
</script>

<style>
.wordCloud {
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  perspective: 1000px;
}
.wordCloudTag {
  display: block;
  white-space: nowrap;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0;
  text-decoration: none;
  font-size: 0.8em;
  font-family: siyuan;
  font-weight: bold;
  transition: all 0.16s ease;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: 0.16s;
}
.fade1-enter,
.fade1-leave-to {
  opacity: 0;
}
</style>
