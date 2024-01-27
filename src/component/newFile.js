import { ref, onMounted, watch, computed } from 'vue';
import { regionData, CodeToText } from 'element-china-area-data';

export default (() => {
const __VLS_setup = async () => {
const selectedOptions = ref([]);
const props = defineProps({
location: {
default: ''
},
placeholder: {
default: '请选择地点'
}
});
const isArr = computed(() => {
random();
return props.location instanceof Array;
});
const emits = defineEmits(['update:location']);
const cRef = ref(null);
watch(selectedOptions, () => {
var loc = '';
for (let i = 0; i < selectedOptions.value.length; i++) {
if (i !== selectedOptions.value.length - 1) {
loc += CodeToText[selectedOptions.value[i]] + '\/';
} else {
loc += CodeToText[selectedOptions.value[i]];
}
}
emits('update:location', isArr.value ? loc.split('\/').filter(Boolean) : loc);
// emits('update:location', isArr.value ? loc.split('\/').filter(Boolean) : loc.replace(/\//g, ''))
});
watch(() => props.location, useInitial);

onMounted(() => {
props.location && useInitial();
});
function useInitial() {
cRef.value
?.querySelector('input')
.setAttribute('value', isArr.value ? props.location.join('\/') : props.location);
}
const __VLS_publicComponent = (await import('vue')).defineComponent({
setup() {
return {
$props: (await import('./__VLS_types.js')).makeOptional(defineProps({
location: {
default: ''
},
placeholder: {
default: '请选择地点'
}
})),
$emit: emits,
};
},
});

const __VLS_componentsOption = {};

let __VLS_name!: 'camp-place';
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {} &
import('./__VLS_types.js').WithComponent<'ElCascader', typeof __VLS_components, 'ElCascader', 'elCascader', 'el-cascader'>;
__VLS_components.ElCascader; __VLS_components.ElCascader; __VLS_components.elCascader; __VLS_components.elCascader; __VLS_components['el-cascader']; __VLS_components['el-cascader'];
// @ts-ignore
[ElCascader, ElCascader,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { ref: ("cRef"), };
// @ts-ignore
(__VLS_ctx.cRef);
// @ts-ignore
[cRef,];
{
__VLS_templateComponents.ElCascader;
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.ElCascader>) = { style: ({}), modelValue: ((__VLS_ctx.selectedOptions)), options: ((__VLS_ctx.regionData)), placeholder: ((__VLS_ctx.placeholder)), };
// @ts-ignore
[selectedOptions, regionData, placeholder,];
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
...props,
regionData: regionData,
selectedOptions: selectedOptions,
cRef: cRef,
};
},
});
return {} as typeof __VLS_publicComponent;
};
return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
