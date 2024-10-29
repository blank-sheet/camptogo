<template>
  <div ref="cRef">
    <el-cascader
      style="min-width: 250px"
      v-model="selectedOptions"
      :options="regionData"
      :placeholder="placeholder"
      @change="handleChange"
      filterable>
    </el-cascader>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios';

const selectedOptions = ref([])
const props = defineProps({
  worldMap: {
    type: Array,
    default: []
  },
  location: {
    type: [String, Array],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择地点'
  }
})

const emits = defineEmits(['update:location'])

const regionData = ref([])

const cRef = ref(null)

watch(selectedOptions, (newVal) => {
  const locationPath = findPathByValue(regionData.value, newVal)
  // const locationPath = newVal.map(item => {
  //   if (item == "") {
  //     return '市辖区'
  //   } else {
  //     return findNameByCode(regionData.value, item)
  //   }
  // });
  // const locationPath = newVal.map(option => option.label);
  console.log(locationPath);
  
  emits('update:location', locationPath);
});

onMounted(() => {
  regionData.value = formatRegionData(props.worldMap);
  
  if (props.location) {
    const locationArray = Array.isArray(props.location) ? props.location : props.location.split('/');
    selectedOptions.value = findSelectedOptions(regionData.value, locationArray).map(item => item.value) 
  }
});

const formatRegionData = (data) => {
  return data.map(item => {
    return {
      value: item.code,
      label: item.name,
      children: item.clist ? formatRegionData(item.clist) : (item.pchilds ? formatRegionData(item.pchilds) : (item.cchilds ? formatRegionData(item.cchilds) : []))
    };
  });
};

// const findSelectedOptions = (data, path) => {
//   for (const item of data) {
//     console.log(item);
    
//     if (item.label === path[0]) {
//       if (path.length > 1) {
//         return [item, ...findSelectedOptions(item.children, path.slice(1))];
//       } else {
//         return [item];
//       }
//     }
//   }
//   return [];
// };

const findSelectedOptions = (data, path) => {
  for (const item of data) {
    if (item.label === path[0]) {
      if (path.length > 1) {
        if (item.label === '市辖区' && item.children) {
          // 特殊处理市辖区节点，根据其子级节点找到正确的节点
          const childPath = findSelectedOptions(item.children, path.slice(1));
          if (childPath.length > 0) {
            return [item, ...childPath];
          }
        } else {
          // 非市辖区节点，正常递归查找
          return [item, ...findSelectedOptions(item.children, path.slice(1))];
        }
      } else {
        return [item];
      }
    }
  }
  return [];
};

// 深度优先排查
const findPathByValue = (data, path) => {
  const labels = [];

  function dfs(nodes, pathIndex) {
    if (pathIndex >= path.length) {
      // 如果路径索引超出范围，说明已经找到完整路径
      return true;
    }

    for (const node of nodes) {
      if (node.value === path[pathIndex] || path[pathIndex] === '') {
        // 如果当前节点的value与路径匹配，或者路径的当前值为空，则继续搜索
        labels.push(node.label); // 添加label到结果数组
        if (dfs(node.children, pathIndex + 1)) {
          // 如果在子节点中找到了完整路径，返回true
          return true;
        }
        // 如果没有找到完整路径，则回溯，移除当前label
        labels.pop();
      }
    }
    // 如果当前层级没有找到匹配的节点，返回false
    return false;
  }

  // 从根节点开始搜索
  dfs(data, 0);

  // 返回找到的路径，如果没有找到，则返回空数组
  return labels;
}

const findNameByCode = (data, code) => {
  // 遍历数据查找对应的code
  function traverse(items) {
    for (let item of items) {
      if (item.value == code) {
        return item.label;
      }
      if (item.children && item.children.length > 0) {
        let result = traverse(item.children);
        if (result) return result;
      }
    }
    return null;
  }

  return traverse(data);
}

const handleChange = (value) => {
  selectedOptions.value = value;
};
</script>

<style lang="scss" scoped></style>
