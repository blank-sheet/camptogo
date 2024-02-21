<template>
  <div class="product-detail">
    <div class="title">{{ userInfo.role == 'AUDITOR' ? '审核商品' : '添加商品' }}</div>
    <main v-loading="isLoading">
      <el-form ref="formRef" :model="form">
        <product-form title="商品基本信息" id="1" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="商品名称：" prop="fullName">
              <el-input style="width: 582px" v-model="form.fullName" placeholder="请输入商品名称,作为商品标题显示" maxlength="40"
                show-word-limit />
              <el-tooltip content="<span>作为商品标题显示，请填写商品特色和优势的关键词，无<br>需出现“招生年龄，时间地点，活动天数”等重复信息<span>" raw-content
                placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="商品类别：" prop="categoryList" :is-array="true">
              <el-select multiple placeholder="点击选择" style="width: 400px" v-model="form.categoryList">
                <el-option v-for="item in categoryOptions" :key="item.value" :label="item.name"
                  :value="item.categoryId.toString()" />
              </el-select>
            </CampFormItem>
            <CampFormItem label="最低成团人数：">
              <el-radio-group v-model="form.groupLimitIf">
                <el-radio :label="true">设置低于
                  <el-input-number :min="0" :disabled="!form.groupLimitIf" v-model="form.groupLimitSize"
                    controls-position="right" />
                  人不成团
                  <span class="desc">*不成团将全额退款，互不承担责任</span></el-radio>
                <el-radio :label="false">商品不设最低成团数
                  <span class="desc">*有任1订单操作审核通过即成团</span></el-radio>
              </el-radio-group>
            </CampFormItem>
            <CampFormItem label="活动属性：">
              <div class="back-ontainer">
                <span class="desc">*活动属性是你为本活动设置的服务套餐类型设置，可以自定义填写</span>
                <div style="margin: 6px; display: flex;">
                  <div v-for="(tag, index) in form.activityAttributeList" :key="index">
                    <el-input class="w-20" v-if="editable[index]" v-model="tag.attributeName" ref="editableInput"
                      size="small" @keyup.enter.native="editableInputBlur(tag, index)"
                      @blur="editableInputBlur(tag, index)" maxlength="10" show-word-limit></el-input>
                    <el-tag class="mx-1" v-else closable :disable-transitions="false" @click="showEditTagInput(index)"
                      @close="tagClose(tag)">
                      {{ tag.attributeName }}
                    </el-tag>
                  </div>
                  <el-input v-if="inputVisible" ref="InputRef" v-model="tagValue" class="ml-1 w-20" size="small"
                    @keyup.enter="addAttributeConfirm" @blur="addAttributeConfirm" maxlength="10" show-word-limit />
                  <el-button v-else class="button-new-tag ml-1" size="small" @click="addAttribute">
                    + 添加属性
                  </el-button>
                </div>
                <div v-if="form.activityAttributeList.length > 0" class="twocolum">属性设置</div>
                <section v-if="form.activityAttributeList.length > 0" class="greensection">
                  <ElSelect placeholder="请选择活动属性" v-model="attributeSelect">
                    <ElOption v-for="(o, index) in form.activityAttributeList" :key="index" :label="o.attributeName"
                      :value="index" />
                  </ElSelect>
                  <div>增加价格(元)</div>
                  <div>可报名人数</div>
                  <div>操作</div>
                </section>
                <section v-if="form.activityAttributeList.length > 0"
                  v-for="(item, i) in form.activityAttributeList[attributeSelect]?.optionList" :key="i">
                  <div class="btn-center">
                    <el-input v-model="form.activityAttributeList[attributeSelect].optionList[i].optionName"
                      placeholder="请输入属性选项" maxlength="24" show-word-limit />
                  </div>
                  <div class="btn-center">
                    <el-input-number :min="0" v-model="form.activityAttributeList[attributeSelect].optionList[i].addPrice"
                      controls-position="right" placeholder="价格" />
                  </div>
                  <div class="btn-center">
                    <el-input-number :min="0"
                      v-model="form.activityAttributeList[attributeSelect].optionList[i].availableNum"
                      controls-position="right" placeholder="人数" />
                  </div>
                  <div class="btn-center">
                    <el-Button @click="deleteActivityAttribute(i)" class="dashedbutton"><el-icon
                        style="margin-right: 5px">
                        <Minus />
                      </el-icon>删除属性值</el-Button>
                  </div>
                </section>
                <div v-if="form.activityAttributeList.length > 0" class="normal">
                  <el-Button @click="addActivityAttribute" class="dashedbutton"><el-icon style="margin-right: 5px">
                      <Plus />
                    </el-icon>添加属性值</el-Button>
                </div>
              </div>
            </CampFormItem>
            <CampFormItem label="活动时间：" prop="multigroupProductType">
              <ElSelect clearable style="width: 250px" v-model="form.multigroupProductType" placeholder="请选择是否为多团期商品">
                <ElOption label="是" value="MULTIGROUP_PARENT" />
                <ElOption label="否" value="NOT_MULTIGROUP" />
                <ElOption v-show="false" label="是" :value="0" />
              </ElSelect>
              <div style="width: 100%; margin-top: 10px"></div>
              <template v-if="form.multigroupProductType == 'NOT_MULTIGROUP'">
                <CampDatePicker v-model="form.groupPeriodList[0].activityTimeRange[0]" placeholder="开始日期" />
                <span style="margin: 0 10px 0 0"> - </span>
                <CampDatePicker v-model="form.groupPeriodList[0].activityTimeRange[1]" placeholder="结束日期" />
                <span>
                  共{{ getDurationTime(form.groupPeriodList[0].activityTimeRange[0],
                    form.groupPeriodList[0].activityTimeRange[1]) }}天
                </span>
              </template>
              <template v-else>
                <div class="boxs">
                  <div v-for="(day, index) in form.groupPeriodList" :key="index" style="margin: 5px 0">
                    <CampDatePicker v-model="day.activityTimeRange[0]" placeholder="开始日期"
                      @change="formatDuration(index),isBeforeBeginDay(index)" />
                    <span style="margin: 0 10px 0 0">-</span>
                    <CampDatePicker v-model="day.activityTimeRange[1]" placeholder="结束日期"
                      :disabled="form.multigroupProductType != 'NOT_MULTIGROUP' && index > 0"
                      @change="formatDuration(index),isBeforeBeginDay(index)" />
                    <span>共{{ getDurationTime(day.activityTimeRange[0], day.activityTimeRange[1]) }}天</span>
                    <div class="add" style="width: 400px; margin: 10px" @click="deleteGroupPeriod(index)">- 删除团期</div>
                  </div>
                  <div class="add" style="width: 400px; margin: 10px" @click="
                    form.groupPeriodList.push({
                      activityTimeRange: [undefined, undefined]
                    })
                  ">
                    + 添加更多团期
                  </div>
                </div>
              </template>
            </CampFormItem>
            <!-- ========================================================= -->
            <CampFormItem label="划线价格：" prop="priceOriginal">
              <campNumber v-model:number="form.priceOriginal" :price="100" style="width: 150px" />
              <span class="desc">*原价（单位：元）</span>
              <el-tooltip content="划线是将之前的商品价格用横线划去的标识方式，划线价格可以是商品的正品零<br>售价、商家指导价或该商品曾经展示过的销售价格，并非原价，仅供消费者参考。"
                raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="未划线价格：" prop="priceSelling">
              <campNumber v-model:number="form.priceSelling" :price="100" style="width: 150px" />
              <span class="desc">*原价（单位：元）</span>
              <el-tooltip content="未划线价格指商品的实时标价，实际售价，<br>但实际成交价格以订单结算页面为准。" raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="退改方案：" prop="refundPlanType">
              <ElSelect placeholder="请选择退改方案" v-model="form.refundPlanType">
                <ElOption v-for="(o, index) in backOptions" :key="index" :label="o.label" :value="o.value" />
              </ElSelect>
              <el-tooltip content="【有条件退】自服务商对订单确认通过之时起，如需<br>退订，须按照所购买商品的具体退费规则和比例办理<br>退款，服务商应在发布商品时设置合法有效的退改标<br>准。"
                raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
              <div v-show="form.refundPlanType == 'CAUSE' || true" class="back-ontainer">
                <div class="twocolum">有条件退设置</div>
                <section class="greensection">
                  <div>行程前</div>
                  <div>违约金</div>
                </section>
                <section>
                  <div>
                    <p>行程前</p>
                    <el-input-number :min="0" v-model="form.refundPlanList[0].rightDays" controls-position="right"
                      placeholder="整数" />
                    <p>日以前</p>
                  </div>
                  <div>
                    <p>商品费用总额的</p>
                    <el-input-number v-model="form.refundPlanList[0].percentTotal" :min="0" controls-position="right"
                      placeholder="整数" />&nbsp;
                    <p>%</p>
                  </div>
                </section>
                <section v-for="(item, index) in form.refundPlanList.slice(1, -1)">
                  <div>
                    <p>行程前</p>
                    <el-input-number v-model="form.refundPlanList[index + 1].leftDays" :min="0" controls-position="right"
                      placeholder="整数" />
                    <p>至</p>
                    <el-input-number v-model="form.refundPlanList[index + 1].rightDays" :min="0" controls-position="right"
                      placeholder="整数" />
                    <p>日</p>
                  </div>
                  <div>
                    <p>商品费用总额的</p>
                    <el-input-number :min="0" v-model="form.refundPlanList[index + 1].percentTotal"
                      controls-position="right" placeholder="整数" />
                    <p>%</p>
                    <div class="refund-delete" @click="() => {
                      form.refundPlanList.splice(index + 1, 1)
                    }
                    ">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </div>
                  </div>
                </section>
                <div class="normal">
                  <el-Button @click="addNewBack" class="dashedbutton"><el-icon style="margin-right: 5px">
                      <Plus />
                    </el-icon>添加区间</el-Button>
                </div>
                <section>
                  <div>
                    <p>行程前</p>
                    <el-input-number v-model="form.refundPlanList.at(-1).leftDays" :min="0" controls-position="right"
                      placeholder="整数" />
                    <p>至1日</p>
                  </div>
                  <div>
                    <p>商品费用总额的</p>
                    <el-input-number v-model="form.refundPlanList.at(-1).percentTotal" :min="0" controls-position="right"
                      placeholder="整数" />&nbsp;
                    <p>%</p>
                  </div>
                </section>
              </div>
            </CampFormItem>
            <CampFormItem>
              <template #label>
                <span style="line-height: 16px; position: relative; top: 6.5px">活动特色：<br />
                  <span class="desc">选填</span>
                </span>
              </template>

              <el-select :teleported="false" class="features" multiple placeholder="请选择2-7项活动特色"
                v-model="form.generalFeatureList" style="width: 640px">
                <el-option v-for="item in features" :key="item.featureId" :label="item.name"
                  :value="item.featureId.toString()" />
              </el-select>
            </CampFormItem>
            <CampFormItem>
              <template #label>
                <span style="line-height: 16px; position: relative; top: 6.5px">优势认证：<br />
                  <span class="desc">选填</span>
                </span>
              </template>
              <div class="boxs">
                <div v-for="(f, i) in form.certifiedFeatureList" :key="i">
                  <div>请选择认证类型</div>
                  <el-select multiple v-model="f.featureList">
                    <el-option v-for="option in certifiedFeatures" :value="option.value" :label="option.label" />
                  </el-select>
                  <div>
                    请上传相应证明材料<span class="desc">
                      请上传完整清晰的彩色图片，支持jpg/png格式
                    </span>
                  </div>
                  <CampUpload v-model:images="f.certificate" />
                  <div class="add" @click="deleteFeature(i)">删除认证</div>
                </div>
                <div class="add" @click="addFeature">添加认证</div>
              </div>
            </CampFormItem>
          </template>
        </product-form>
        <product-form title="课程详情" id="2" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="活动人数：" prop="sizeValid">
              <el-input-number :min="0" v-model.number="form.sizeValid" controls-position="right"
                placeholder="整数" />&nbsp;人
              <span class="desc">*活动人数为参与活动总人数，非库存数</span>
            </CampFormItem>
            <CampFormItem label="报名年龄：" prop="ageMin">
              <el-input-number :min="0" v-model="form.ageMin" controls-position="right" placeholder="整数" />&nbsp;岁至&nbsp;
              <el-input-number :min="0" v-model="form.ageMax" controls-position="right" placeholder="整数" />
              <el-tooltip content="请确认您所投保保险的年龄承保范围，不<br>符合要求的，保险公司可能不予承保。" raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="日程形式：" prop="activityMode">
              <el-select placeholder="请选择住宿形式" v-model="form.stayIf">
                <el-option label="需要住宿" :value="true"></el-option>
                <el-option label="不需要住宿" :value="false"></el-option>
              </el-select>
              &nbsp;&nbsp;
              <el-select placeholder="请选择参与形式" v-model="form.activityMode">
                <el-option v-for="item in ['独立', '亲子', '亲子单飞']" :value="item" key="item" />
              </el-select>
            </CampFormItem>
            <CampFormItem label="难易度：" prop="difficulty">
              <el-rate :texts="['1星', '2星', '3星', '4星', '5星']" show-text v-model="form.difficulty" />
              <el-tooltip content="1星为无门槛<br>2星为入门级<br>3星为需要一定经验<br>4星为有一定专业背景<br>5星为需达到考核标准" raw-content
                placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="活动类型：" prop="activityType">
              <el-select placeholder="请选择活动形式" v-model="form.activityType">
                <template v-for="item in activityTypes" :key="item.label">
                  <div class="tip">
                    <el-option :value="item.value">
                      <div>
                        {{ item.label }}
                        <span style="font-size: small; color: gray">{{ item.desc }}</span>
                      </div>
                    </el-option>
                  </div>
                </template>
              </el-select>
            </CampFormItem>
            <CampFormItem label="师生比：">
              <el-input-number :min="0" placeholder="整数" controls-position="right" style="margin-right: 10px"
                v-model="form.teacherStudent.teacher" />
              : &nbsp;
              <el-input-number placeholder="整数" :min="0" controls-position="right"
                v-model="form.teacherStudent.student" />
              <span class="desc"> 活动团队职员总数:活动人数 </span>
            </CampFormItem>
            <CampFormItem label="支持语言：" prop="languageList" :is-array="true">
              <el-select style="width: 80%" multiple v-model="form.languageList" placeholder="点击选择，可多选">
                <el-option v-for="item in languages" :key="item.label" :label="item.label" :value="item.value.name" />
              </el-select>
            </CampFormItem>
          </template>
        </product-form>
        <product-form title="商品详情" id="3" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="宣传标语：" prop="mainSlogon">
              <el-input placeholder="请填写宣传标语" type="textarea" autosize v-model="form.mainSlogon" maxlength="14"
                show-word-limit></el-input>
              <el-tooltip content="宣传标语是对商品优势卖点的归纳" placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="主题描述：" prop="theme"><el-input v-model="form.theme" style="width: 400px"
                placeholder="请对活动主题做出描述" maxlength="20" autosize show-word-limit />
              <el-tooltip content="主题指您在“商品基本信息-商品主题”中选择的单个或多个类别" placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="主题详情：" prop="themeDetails">
              <el-input type="textarea" v-model="form.themeDetails" placeholder="请结合活动主题对活动内容做出描述" autosize
                maxlength="500" show-word-limit></el-input>
            </CampFormItem>
            <CampFormItem label="副宣传语：" prop="subSlogon"><el-input v-model="form.subSlogon" type="textarea" autosize
                placeholder="请填写副宣传语" maxlength="14" show-word-limit />
              <el-tooltip content="副宣传语是对商品优势卖点的补充" placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="我们的优势：" prop="advantageList[0].title">
              <div class="boxs">
                <div v-for="(item, i) in form.advantageList">
                  <div>卖点{{ i + 1 }}</div>
                  <div>
                    <el-input v-model="item.title" placeholder="请填写标题" type="textarea" autosize maxlength="14"
                      show-word-limit />
                  </div>
                  <div>卖点{{ i + 1 }}详情</div>
                  <div>
                    <el-input v-model="item.detail" type="textarea" autosize placeholder="请对卖点进行描述" maxlength="500"
                      show-word-limit />
                  </div>
                  <div class="add" @click="deleteAdvantage(i)">删除卖点</div>
                </div>
                <div class="add" @click="addAdvantage">添加卖点</div>
              </div>
            </CampFormItem>
            <CampFormItem label="收获详情：" prop="gains">
              <span class="desc">*请逐条罗列收获详情，须注意将收获内容进行换行输入</span>
              <el-input v-model="form.gains" style="width: 80%" type="textarea" autosize placeholder="请详细描述收获内容"
                maxlength="500" show-word-limit />
            </CampFormItem>
            <CampFormItem label="教学提纲：" prop="outlineList[0].detail" :is-array="true">
              <div class="boxs">
                <div v-for="(item, i) in form.outlineList">
                  <div>提纲章节{{ i + 1 }}</div>
                  <div>
                    <el-input v-model="item.title" style="width: 80%" type="textarea" autosize placeholder="请填写标题"
                      maxlength="14" show-word-limit />
                  </div>
                  <div>提纲章节{{ i + 1 }}详情</div>
                  <div>
                    <el-input v-model="item.detail" type="textarea" autosize placeholder="请对章节进行描述" maxlength="500"
                      show-word-limit />
                  </div>
                  <div class="add" @click="deleteOutline(i)">删除提纲</div>
                </div>
                <div class="add" @click="addOutline">添加提纲</div>
              </div>
            </CampFormItem>
            <CampFormItem label="硬件设施：" prop="venue">
              <div class="hardware">
                <header>活动场地</header>
                <el-input v-model="form.venue" autosize type="textarea" placeholder="您可以从以下方面描述室内室外活动场地：
                              场地名称；场地类型，如运动场、实验室、专业草场等特色或专业场地；设施设备，如监控、新风系统、活动设施、专业设备等。" />
              </div>
              <div class="hardware" style="margin-top: 20px" v-show="form.stayIf">
                <header>住宿条件</header>
                <el-input type="textarea" autosize v-model="form.accommodations" placeholder="您可以从以下方面描述住宿条件：
                              住宿场所类型，如酒店、民宿、营房、青旅等；
                              房间类型，如单人房、双人间、X人宿舍等；
                              房间条件，如床型、热水、卫浴、空调、网络、电器等；
                              安保情况，包括安保人员、夜间值班、巡逻情况等。" />
              </div>
              <div class="hardware">
                <header>教学教具</header>
                <el-input v-model="form.teachingAids" autosize type="textarea"
                  placeholder="您可以从特色教具、定制服装、纪念品、奖章奖状、学员手册等方面进行描述。" />
              </div>
            </CampFormItem>
            <CampFormItem label="服务团队：">
              <div>
                本活动工作人员数量：
                <el-input-number :min="0" controls-position="right" v-model.number="form.team.teamNums" />
                <span class="desc">*请您确保团队成员均有相应从业资质，符合相关法律法规的规定</span>
              </div>
              <div class="hardware">
                <header>团队详情</header>
                <el-input v-model="form.team.detail" type="textarea" autosize placeholder="您可以从以下方面进行描述：
                              团队配置，如课程老师、助教老师、生活老师、安全员、医护人员、摄影老师、领队、导游等；
                              人员详情，如资质、荣誉、教龄等。" />
              </div>
              <div class="hardware">
                <header>专业拍摄</header>
                <span class="desc">
                  *请选择是否有专职拍摄人员，拍摄人员数量，拍摄设备型号；无内容，可留空 </span><br />
                <el-select placeholder="请选择是否有专职拍摄人员" v-model="form.team.isProfessional">
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
                <div v-if="form.team.isProfessional">
                  <div>
                    有<el-input-number style="margin: 20px 0" :min="0" controls-position="right"
                      v-model="form.team.captureNums" />个拍摄人员
                  </div>
                  <el-input type="textarea" autosize placeholder="请从以下方面描述拍摄服务详情：
                              预计产出照片张数；预计产出视频个数，单个视频长度；
                              使用设备型号；机位个数及位置；其他。" v-model="form.team.captureDetail" />
                </div>
              </div>
            </CampFormItem>
            <CampFormItem label="餐饮标准：" prop="food.type">
              <ElSelect v-model="form.food.type">
                <ElOption label="活动主办方提供自营餐饮服务" value="1" />
                <ElOption label="安排第三方提供餐饮服务" value="2" />
                <ElOption label="不提供餐饮，活动参加者自理" value="3" />
              </ElSelect>
              <div style="width: 100%; margin: 10px 0"></div>
              <ElInput type="textarea" v-model="form.food.detail" autosize
                placeholder="您可以从以下方面进行描述：&#13;&#10;含X早餐Y午餐Z晚餐，午餐、晚餐：X菜Y汤&#13;&#10;午餐、晚餐餐标为X元/人/餐&#13;&#10;不足X人时，菜量是否相应减少，是否维持餐标不变&#13;&#10;一桌X人，是否为大桌菜，是否包含酒水" />
              <div v-show="form.food.type == 1" style="width: 100%">
                <div>请您提交食品经营许可证的彩色图片，支持jpg/png。</div>
                <CampUpload v-model:images="form.food.license" />
              </div>
            </CampFormItem>
            <CampFormItem label="医疗情况：" prop="medicalCare">
              <el-input v-model="form.medicalCare" type="textarea" autosize placeholder="您可以从以下方面描述医疗情况：
                              医疗人员情况，如专业医疗人员、员工医疗培训情况等；
                              医疗场所情况，如是否有卫生室等；
                              医疗物资状况，如急救箱、药品、医疗设备等；
                              附近医疗点情况，如附近医院的距离、等级等。" />
            </CampFormItem>
            <CampFormItem label="图片视频上传" :msg="'图片和视频为必选项'">
              <span class="desc">
                *您应确保所上传图片视频素材不涉及侵权，所有图片视频为原创或已获得版权方的授权进行使用，涉及人脸露出的商业应用应确保已获得肖像权授权等
              </span>
              <div>
                <div>
                  短视频
                  <span class="desc">
                    *请上传一段不超过2分钟，大小10M以内的短视频，内容为行前说明或活动风采展示
                  </span>
                </div>
                <el-upload name="image" :headers="authHeader"
                  :on-success="(r, file) => onUploadSuccess(file, 'videoShortResource')" :action="userApi.video"
                  auto-upload class="avatar-uploader" :multiple="false" :show-file-list="false">
                  <video v-if="form.videoShortResource" style="width: 360px"
                    :src="'http://123.57.13.5:82' + form.videoShortResource.url" controls></video>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </div>
              <div>
                <span> 商品头版图（横版） </span>
                <span class="desc">
                  *请上传2-5张高质量活动图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M
                </span>
                <CampUpload v-model:images="form.horizontalShowsResourceList" />
              </div>
              <div>
                <span>竖版风采图（竖版）</span>
                <span class="desc">
                  *请上传2-5张高质量活动图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M
                </span>
                <CampUpload v-model:images="form.verticalShowsResourceList" />
              </div>
              <div>
                <span>服务与设施图（横版）</span>
                <span class="desc">
                  *选题项，请上传2-5张高质量服务与设施图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M
                </span>
                <CampUpload v-model:images="form.facilityShowsResourceList" />
              </div>
            </CampFormItem>
          </template>
        </product-form>
        <product-form title="活动日程表 " id="4" v-on:update:active="setActive">
          <template #form>
            <div class="desc" style="margin-top: 20px">
              *若活动地点变更，请在变更当日，在日程安排最前端以【城市/活动地点】的形式标明；若活动地点无变更，可不重复填写【城市/活动地点】，仅填写具体日程即可;如您没有具体的时间规划，上午可填写8：00-12：00，下午可填写14：00-18：00，晚上可填写18：00-22：00。
            </div>
            <el-form-item label="日程表">
              <div class="scheduls" style="flex-direction: column" v-for="(item, index) in form.dailyScheduleList">
                <div style="display: flex">
                  <h3>第 {{ index + 1 }} 天</h3>
                  <ElButton v-show="index >= 1" style="margin-left: 20px" @click="() => {
                    const dailyIndex = form.dailyScheduleList[index].dailyIndex
                    const dateIndex = form.dailyScheduleList[index].dateIndex
                    form.dailyScheduleList[index] = JSON.parse(
                      JSON.stringify(form.dailyScheduleList[index - 1])
                    ),
                      form.dailyScheduleList[index].dailyIndex = dailyIndex
                    form.dailyScheduleList[index].dateIndex = dateIndex
                  }
                  ">复制前一天行程</ElButton>
                </div>

                <div style="background-color: #f2f2f2">
                  <div class="schdule" v-for="daily in item.itemList">
                    <div class="schdule-box">
                      <campTimePicker :initial="daily.timeRange[0]" v-model:time="daily.timeRange[0]" />
                      <span style="margin: 0 10px 0 0">-</span>
                      <campTimePicker :initial="daily.timeRange[1]" v-model:time="daily.timeRange[1]"
                        placeholder="结束时间" />
                      <el-input placeholder="请填写日程安排" style="width: 50%" v-model="daily.detail"
                        :rules="[{ required: true, message: '日程安排不能为空', trigger: 'blur' }]" />
                      <el-icon @click="() => {
                        deleteDaily(item, daily)
                      }
                      ">
                        <Delete />
                      </el-icon>
                    </div>
                  </div>
                </div>
                <div class="add" @click="() => addDaily(item.itemList)" style="margin-top: 10px; cursor: pointer">
                  添加一行
                </div>
              </div>
            </el-form-item>
          </template>
        </product-form>
        <product-form title="保险信息" id="5" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="组织者责任险：">
              <!-- <campCascader :cascaderChange="liabilityChange" style="width: 80%; margin-bottom: 20px"
                v-model="insurence.liability" :options="liabilityOptions" placeholder="请选择保险信息" /> -->
              <ElSelect v-model="insurence.liability" v-on:change="liabilityChange"
                style="width: 80%; margin-bottom: 20px" placeholder="请选择保险信息">
                <ElOption v-for="(item, level) in liabilityOptions" :label="item.label" :value="item.value">
                </ElOption>
              </ElSelect>
              <div v-if="insurence.liability">
                <ElSelect v-model="form.insuranceInfo.liabilityInsuranceGradeId" style="width: 400px"
                  v-if="!isLiabilitySelf">
                  <ElOption v-for="(item, level) in liabilityGradeList" :key="level" :label="item.title"
                    :value="item.insuranceGradeId">
                  </ElOption>
                </ElSelect>
              </div>
              <ElSelect style="width: 300px" v-if="isLiabilitySelf"
                v-model="form.insuranceInfo.liabilityInsuranceSelfDetails">
                <ElOption label="作为组织者，已在保险公司获准购买组织者责任险" value="作为组织者，已在保险公司获准购买组织者责任险"></ElOption>
                <ElOption label="作为场地业主，已为活动场地购买场地责任险" value="作为场地业主，已为活动场地购买场地责任险"></ElOption>
                <ElOption label="作为旅行社，已按照法律规定购买旅行社责任险" value="作为旅行社，已按照法律规定购买旅行社责任险"></ElOption>
              </ElSelect>
              <el-tooltip content="您选择“购买与营探合作的第三方保险”并提交商品审核的行为，即视为您授权营探将您所<br>录入的商品信息提交至上述保险公司，上述信息将作为核保及日后理赔的依据"
                raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </CampFormItem>
            <CampFormItem label="人身意外险： ">
              <!-- <campCascader style="width: 80%; margin-bottom: 20px" :cascaderChange="accidentChange"
                v-model="insurence.accidence" :options="insurenceOptions" clearable placeholder="请选择保险信息" /> -->
              <ElSelect v-model="insurence.accidence" v-on:change="accidentChange" style="width: 80%; margin-bottom: 20px"
                placeholder="请选择保险信息">
                <ElOption v-for="(item, level) in insurenceOptions" :label="item.label" :value="item.value">
                </ElOption>
              </ElSelect>
              <el-tooltip content="您选择“购买与营探合作的第三方保险”并提交商品审核的行为，即视为您授权营探将您<br>所录入的商品信息提交至上述保险公司，上述信息将作为核保及日后理赔的依据"
                raw-content placement="top-start">
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>

              <div v-if="insurence.accidence">
                <ElSelect v-if="!isAccidentSelf" style="width: 400px"
                  v-model="form.insuranceInfo.accidentInsuranceGradeId">
                  <ElOption v-for="(item, level) in accidentGradeList" :key="level" :label="item.title"
                    :value="item.insuranceGradeId">
                  </ElOption>
                </ElSelect>
              </div>
              <div v-if="isAccidentSelf" style="width: 100%">
                <p>请描述您自购的人身意外险保险方案以及名称</p>
                <ElInput v-model="form.insuranceInfo.accidentInsuranceSelfDetails" type="textarea"
                  placeholder="例：主办方将为您投保由中国平安财产保险公司承保的福寿安康人身意外险，保额10万元，医药费赔偿限额为1万元，免赔额100元起，财产损失赔付限额1000元，具体保单条款请于报名后详询主办方。" />
              </div>
            </CampFormItem>
            <CampFormItem label="最终核保结果：">
              <div>
                <span class="desc"> *核保公司核保完成后,核保结果会自动在此呈现 </span>
                <el-tooltip content="若有更多被保险人如拼团商品中非通过营探报名的出行人、主办方员工等需一并投保的，请在T-1日 (T为活动开始日期) 14时前在商品管理-保险投保模块上传其他被保险人的姓名
                              证件号码、性别、出生年月，平台将在T-1日19时一次性向保险公司发送被保险人信息。因您自身原因导致上述被保险人信息未能报送成功的，营探不承担责任。" raw-content
                  placement="top-start">
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
                <div class="tag">
                  <el-tag class="mx-1" closable type="info">待保险公司核保</el-tag>
                </div>
              </div>
            </CampFormItem>
          </template>
        </product-form>
        <product-form title="购买须知" id="6" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="价格说明">
              <div style="display: flex; flex-direction: column">
                <div>
                  <div>本商品为含税价，包含</div>
                  <el-input v-model="form.priceInclude" type="textarea" autosize
                    placeholder="包括出行人在活动期间的食宿费用、活动项目体验费、课程师资费、场地费、教具物资费等" />
                </div>
                <div>
                  <div>本价格未包含的费用，包括但不限于</div>
                  <el-input v-model="form.priceExclude" type="textarea" autosize
                    placeholder="未包含费用中应当包括：1.其他个人消费（必须填写）；2.收费提供的服务项目，须说明服务内容及其价格；3.活动过程中其他可选择的自费项目及其价格，如：洗漱用具、各地和集散地之间往返的交通费、门票费用、SPA馆体验费、干洗费、住宿升级费用等。" />
                </div>

                <div v-if="!isAccidentSelf">
                  <div>产品包含的保险情况说明</div>
                  <el-input v-model="form.priceInsuranceDetail" type="textarea" autosize
                    :placeholder="getAccidentInsurenceDetails(form.insuranceInfo.accidentInsuranceSelfDetails)" />
                </div>
                <div>
                  <div>特殊条件退订机制</div>
                  <el-input disabled type="textarea" autosize
                    placeholder="超出无损退订期后，因下述几项特定情形导致无法按时履约的，用户可在商品和服务活动开始日期前联系营探客服，提交“特殊原因退订”申请；符合特殊原因退订要求的，营探将按照下述约定向用户提供退款服务，不再适用“有条件退”的具体方案，详情请见《预定退费须知》" />
                </div>
              </div>
            </CampFormItem>
            <CampFormItem label="特别提醒">
              <el-input v-model="form.cautions" type="textarea" autosize
                placeholder="如您存在下述情形但仍选择报名，则不能参与下述活动环节，但原则上非门票类费用不予退款：活动中包含碰碰车项目，10岁以下儿童不宜参与；活动中包含高空项目，心脏病、高血压、眩晕症等疾病患者或身高低于1.2米的不能参加。" />
            </CampFormItem>
          </template>
        </product-form>
        <product-form title="开营须知" id="7" v-on:update:active="setActive">
          <template #form>
            <CampFormItem label="活动入群：">
              <span style="color: #666">*成团后将有专人邀您入群，请尽快完善报名表</span>
            </CampFormItem>
            <CampFormItem>
              <template #label>
                <span style="line-height: 16px">行前说明会：<br />
                  <span class="desc">选填</span>
                </span>
              </template>
              <div style="display: flex; margin-bottom: 20px">
                <CampDatePicker style="width: 180px" v-model:date="form.briefing.startDate" />
                <campTimePicker :initial="form.briefing.timeRange[0]" v-model:time="form.briefing.timeRange[0]" />
                <campTimePicker :initial="form.briefing.timeRange[1]" v-model:time="form.briefing.timeRange[1]"
                  placeholder="结束时间" />
                <el-input placeholder="请输入参与方式" v-model="form.briefing.type" />
              </div>
              <div class="content">
                <div>请填写说明会内容</div>
                <el-input type="textarea" autosize v-model="form.briefing.detail" placeholder="如：1、在线破冰活动
                                    2、在线安全培训
                                    3、答疑，请出行人及监护人积极参加" />
              </div>
            </CampFormItem>
            <CampFormItem label="重要说明：" prop="mustKnow">
              <el-input v-model="form.mustKnow" type="textarea" autosize placeholder="1.未成年人参加独立活动的,在开营当天需由监护人陪同办理相关手续，监护人需携带本人及未成年人身份证原件办理相关手续。 
                              2.如因您隐瞒出行人情况导致不利后果，由您自行承担。
                              3.出行人不应在活动过程中私自食用已知会导致您过敏的食物、酒类、不洁食品饮料，如您私自食用导致不良后果，本平台及服务商不承担任何责任。
                                              " maxlength="500" show-word-limit />
            </CampFormItem>
            <CampFormItem label="活动地点" prop="activityLocation.startLocation">
              <div style="width: 100%; display: flex; margin-bottom: 20px">
                <el-radio-group v-model="activityArea">
                  <el-radio :label="0">国内</el-radio>
                  <el-radio :label="1">海外</el-radio>
                </el-radio-group>
              </div>
              <div style="width: 100%; display: flex; margin-bottom: 20px">
                <span>集合地点</span>
                <div v-if="activityArea == 0" style="display: flex;">
                  <CampPlace style="margin: 0 10px" v-model:location="form.activityLocation.startLocation" />
                  <el-input placeholder="请输入详细地址" v-model="form.activityLocation.startLocationDetailed" />
                </div>
                <div v-if="activityArea == 1" style="display: flex;">
                  <el-input style="margin-left: 10px" placeholder="请输入国家"
                    v-model="form.activityLocation.startLocation[0]" />
                  <el-input style="margin-left: 10px" placeholder="请输入省份"
                    v-model="form.activityLocation.startLocation[1]" />
                  <el-input style="margin-left: 10px" placeholder="请输入市区"
                    v-model="form.activityLocation.startLocation[2]" />
                  <el-input style="margin-left: 10px" placeholder="请输入详细地址"
                    v-model="form.activityLocation.startLocationDetailed" />
                </div>
              </div>
              <div style="width: 100%; display: flex">
                <span>结束地点</span>
                <div v-if="activityArea == 0" style="display: flex;">
                  <CampPlace style="margin: 0 10px" v-model:location="form.activityLocation.endLocation" />
                  <el-input placeholder="请输入详细地址" v-model="form.activityLocation.endLocationDetailed" />
                </div>
                <div v-if="activityArea == 1" style="display: flex;">
                  <el-input style="margin-left: 10px" placeholder="请输入国家"
                    v-model="form.activityLocation.endLocation[0]" />
                  <el-input style="margin-left: 10px" placeholder="请输入省份"
                    v-model="form.activityLocation.endLocation[1]" />
                  <el-input style="margin-left: 10px" placeholder="请输入市区"
                    v-model="form.activityLocation.endLocation[2]" />
                  <el-input style="margin-left: 10px" placeholder="请输入详细地址"
                    v-model="form.activityLocation.endLocationDetailed" />
                </div>
              </div>
            </CampFormItem>
            <CampFormItem label="报道着装要求">
              <el-select placeholder="请选择是否有着装要求" v-model="form.unifiedClothing">
                <el-option :value="true" label="有着装要求"> </el-option>
                <el-option :value="false" label="无着装要求"> </el-option>
              </el-select>
              <div style="width: 100%; margin: 20px" />
              <el-input type="textarea" autosize placeholder="请填写具体的着装要求" v-if="form.unifiedClothing"
                v-model="form.clothingDetail" />
            </CampFormItem>
            <CampFormItem label="整理物资准备" prop="preparation">
              <el-input v-model="form.preparation" type="textarea" autosize placeholder="1.家长可以提前准备一封关怀、鼓励孩子的信。
                              2.有特长的同学携带设备参加活动,须提前沟通。" maxlength="500" show-word-limit>
              </el-input>
            </CampFormItem>
            <CampFormItem label="团队紧急联系人方式" prop="emergencyContact.name">
              <span class="desc">*请填写主理人团队紧急联系方式</span>
              <div style="width: 100%"></div>
              <el-input placeholder="姓名" v-model="form.emergencyContact.name"></el-input>
              <el-input placeholder="团队职务" style="margin: 10px" v-model="form.emergencyContact.title"></el-input>
              <el-input placeholder="请输入电话号码" v-model="form.emergencyContact.phone"></el-input>
              <el-input style="width: 300px" placeholder="有时间要求或者其他限制，请补充在此"
                v-model="form.emergencyContact.detail"></el-input>
            </CampFormItem>
          </template>
        </product-form>
        <!-- <product-form title="销售信息">
          <template #form>
            <CampFormItem label="销售价格" prop="price">
              <div>
                <p class=" text-gray-500">
                  *根据您与营探的协议约定，您通过营探平台发布的商品和服务的价格（包括但不限于商品销售价、优惠价、到手价、成交价等），不得高于您同款商品和服务在其他渠道的历史最低销售价格（包括门店线下销售、官方在线销售渠道的销售价格）；若高于上述价格，您须立刻返还差价给营探平台消费者，并下调平台展示的商品和服务价格（该销售价格指不包含任何优惠折扣的原价），对于营探平台因此遭受的损失以及维权所花费用予以赔偿。
                </p>
                <div class="flex">
                  <ElFormItem label="基础价格(元)">

                    <el-input placeholder="请输入价格" v-model="form.price" />
                  </ElFormItem>
                  <ElFormItem label="未划线价格(元)">
                    <el-input placeholder="请输入价格" v-model="form.price" />
                  </ElFormItem>
                </div>
              </div>
            </CampFormItem>
            <div>
              <span>销售规格</span>
              <span>*需写明产品规格及选项，如住宿条件（单人间、双人间）套餐类型（儿童单人、家庭双人）等；最多可添加3组规格。</span>
            </div>
            <div>
              <ElSelect placeholder="请选择销售规格">
                <ElOption label="可选套餐" value="1" />
                <ElOption label="住宿增值" value="1" />
                <ElOption label="增值项目" value="1" />
              </ElSelect>
            </div>
            <div>
              <span>库存价格</span>
              <span>只有销售规格填写内容了才会展示这张必填的表格，如果销售规格不填相当于按之前的流程走</span>
            </div>
            <CampFormItem label="退改方案">
            </CampFormItem>
          </template>
        </product-form> -->
      </el-form>
    </main>

    <camp-footer v-if="userInfo.role == 'PROVIDER'">
      <el-dialog v-model="showPreview" title="查看预览" width="30%" :before-close="() => (showPreview = false)">
        <img :src="imgPreview" />
      </el-dialog>
      <!-- 创建商品 -->
      <el-button @click="router.push('/user/workbench/productLunch')">返回</el-button>
      <!-- 新商品,或者草稿商品 -->
      <!-- <template v-if="isNewProdoct || (form.status && '5100'.includes(form.status.toString()))"> -->
      <template
        v-if="isNewProdoct || (form.productStatus && 'DRAFT/CREATED_WAIT_REVIEW'.includes(form.productStatus.toString()))">
        <el-button type="success" @click="createProduct(formRef)">提交审核</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <ElButton v-show="form.productStatus == 'DRAFT'" type="danger" @click="deleteProduct">删除商品</ElButton>
      </template>
      <!-- 上架待审核 -->
      <template v-if="form.productStatus && 'ONLINE_WAIT_REVIEW'.includes(form.productStatus.toString())">
        <el-button type="success" @click="copyProduct">复制商品</el-button>
        <el-button type="success" @click="getPreview">查看预览</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <ElButton type="danger" @click="deleteProduct">删除商品</ElButton>
      </template>
      <!-- <el-button type="success" @click="dialogVisible = true">点击上架</el-button> -->
      <!-- 平台审核通过后 -->
      <template v-if="form.productStatus && 'CREATED_REVIEWED'.includes(form.productStatus.toString())">
        <el-button type="success" @click="getPreview">查看预览</el-button>
        <el-button type="success" @click="copyProduct">复制商品</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <ElButton type="danger" @click="deleteProduct">删除商品</ElButton>
      </template>
      <!-- 核保审核通过后 -->
      <template v-if="form.productStatus && 'UNDERWRITING_REVIEWED'.includes(form.productStatus.toString())">
        <el-button type="success" @click="createProduct(formRef)">提交修改</el-button>
        <el-button type="success" @click="getPreview">查看预览</el-button>
        <el-button type="success" @click="copyProduct">复制商品</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <el-button type="success" @click="dialogVisible = true">点击上架</el-button>
        <ElButton type="danger" @click="deleteProduct">删除商品</ElButton>
      </template>
      <!-- 上架后 -->
      <template v-if="form.productStatus && 'HALTED_SALES'.includes(form.productStatus.toString())">
        <el-button type="success" @click="() => createProduct(formRef)">提交修改</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
      </template>
    </camp-footer>
    <nav class="product-nav">
      <ul>
        <li v-for="(nav, index) in navs" :class="{
          nav: true,
          'nav-active': index == activeNav - 1
        }">
          <span></span>
          <span @click="goToPosition(index + 1)">
            {{ nav }}
          </span>
        </li>
      </ul>
    </nav>
    <el-dialog v-model="dialogVisible" width="750px">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="核保结果" />
          <el-step title="商品信息" />
        </el-steps>
        <div v-if="active === 0 && !(form.isLiabilitySelf && form.isAccidentSelf)">
          <div class="title">核保结果确认</div>
          <el-divider />
          <div class="desc" style="margin: 30px 0">
            *如您不同意保险公司给出的保险方案，请不要点击“确定”以及进行后续商品上架操作；上架商品即视为同意保险方案。
          </div>
          <div class="title">保险价格</div>
          <div style="margin-left: 40px">
            <div style="display: flex">
              <el-checkbox :model-value="Boolean(insurenceAuditDetail?.lessThanSixLiabilityInsuranceUnitPrice)"
                label="组织者责任险：" size="large" />
              <div style="margin-top: 13px">
                <p>
                  1-5周岁：{{
                    insurenceAuditDetail?.lessThanSixLiabilityInsuranceUnitPrice / 100 || '未购买'
                  }}
                  <span class="desc">(单位：元每人每天)</span>
                </p>
                <br /><br />
                <p>
                  6-11周岁：{{ insurenceAuditDetail?.sixToElevenLiabilityInsuranceUnitPrice / 100
                  }}<span class="desc">单位：元每人每天)</span>
                </p>
                <br /><br />
                <p>
                  12-70周岁：{{
                    insurenceAuditDetail?.greaterThanElevenLiabilityInsuranceUnitPrice / 100
                  }}<span class="desc">(单位：元每人每天)</span>
                </p>
                <br /><br />
              </div>
            </div>
            <div>
              <el-checkbox :model-value="Boolean(insurenceAuditDetail?.accidentInsuranceUnitPrice)" label="意外险："
                size="large" /><span style="margin-left: 44px">
                {{ insurenceAuditDetail?.accidentInsuranceUnitPrice / 100 || '未购买' }}
                <span class="desc">(单位：元每人每天)</span></span>
            </div>
          </div>
        </div>
        <ElForm v-else>
          <h3 style="margin: 20px 0">商品信息选择</h3>
          <CampFormItem label="上架频道">
            <ElSelect v-model="upShalveDatas.channel_id">
              <ElOption v-for="chanel in chanels" :value="chanel.id" :label="chanel.name">
              </ElOption>
            </ElSelect>
          </CampFormItem>
          <CampFormItem label="活动起售时间">
            <CampDatePicker v-model:date="upShalveDatas.product_launching_time" />
          </CampFormItem>
          <CampFormItem label="活动停售时间">
            <CampDatePicker v-model:date="upShalveDatas.product_expiration_time" />
          </CampFormItem>
          <CampFormItem label="库存">
            在本平台中可报名
            <ElInputNumber v-model="upShalveDatas.recruit_total" style="width: 90px" controls-position="right" />人
            <span class="desc">不得高于活动总人数</span>
          </CampFormItem>
          <CampFormItem label="订单自动审核">
            <el-switch v-model="upShalveDatas.reconsideration" />
            <span class="desc">
              *开启后，若订单生成已满18小时或活动即将开始但商家仍未处理订单，订单将自动审核通过；不开启，订单将自动审核不通过。
            </span>
          </CampFormItem>
        </ElForm>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!-- <ElButton v-show="active" @click="active = 0">上一步</ElButton> -->
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmUpShalve"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import ProductForm from './components/product-form.vue'
import { Plus } from '@element-plus/icons-vue'
import { request, authHeader } from '../../../../api/index.js'
import { userApi } from '../../../../api/modules/user/user.js'
import { ref, computed, onMounted, watch, reactive, nextTick } from 'vue'
import { useStore } from '../../../../store'
import CampFooter from '../../../../component/camp-footer.vue'
import CampDatePicker from '../../../../component/camp-date-picker.vue'
import CampUpload from '../../../../component/camp-upload.vue'
import CampPlace from '../../../../component/camp-place.vue'
import { isIlleagle } from './helper/wordReview.js'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox, ElSelect } from 'element-plus'
import CampFormItem from '../../../../component/camp-form-item.vue'
import campCascader from '../../../../component/camp-cascader.vue'
import campTimePicker from '../../../../component/camp-time-picker.vue'
import campTimeSelector from '../../../../component/camp-time-selector.vue'
import campNumber from '../../../../component/camp-number.vue'
import { getAccidentInsurenceDetails } from './helper/insurence.js'
import {
  certifiedFeatures,
  backOptions,
  languages,
  activityTypes,
  liabilityOptions,
  insurenceOptions,
  navs
} from './helper/const.js'
const isLoading = ref(false)
const radio1 = ref(true)
const dialogVisible = ref(false)
const active = ref(1)
const activeNav = ref(0)
const formRef = ref()
const activityArea = ref(0)
const store = useStore()
const router = useRouter()
const route = useRoute()
const insurence = reactive({
  accidence: undefined,
  liability: undefined
})
const liabilityGradeList = ref([])
const accidentGradeList = ref([])
const insurenceAuditDetail = ref({
  // 小于6岁责任险单价  单位分 为null则未选择购买
  lessThanSixLiabilityInsuranceUnitPrice: undefined,
  // 6-11岁责任险单价
  sixToElevenLiabilityInsuranceUnitPrice: undefined,
  // 大于11岁责任险单价
  greaterThanElevenLiabilityInsuranceUnitPrice: undefined,
  // 意外险单价 为null则未选择购买
  accidentInsuranceUnitPrice: undefined
})
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const liabilityChange = () => {
  form.value.insuranceInfo.liabilityInsuranceSelfDetails = undefined

  if (isLiabilitySelf.value) {
    ElMessageBox.confirm(
      '若您选择自行购买其他保险，请勾选符合您经营情形的对应选项，并确认该保单能在活动开始前生效。若您不属于以上三种任意一种情形，请选择购买营探定制责任险。否则，依据相关法律规定，我们无法为您的商品上架。',
      '提示',
      {
        confirmButtonText: '确定',
        type: 'warning'
      }
    )
  } else {
    ElMessageBox.confirm(
      '营探与第三方保险公司合作，为您提供专属定制保险方案，在作出是否购买的决定前，请务必仔细阅读《保险方案》中的内容。若您同意购买，将视为同意上述《保险方案》中的全部内容，并委托营探向该保险公司投保单，营探将及时向您反馈保险公司的核保结果。',
      '特别提示',
      {
        confirmButtonText: '确定',
        type: 'warning'
      }
    )
  }
}

const accidentChange = () => {
  form.value.insuranceInfo.accidentInsuranceSelfDetails = undefined
  if (isAccidentSelf.value) {
    ElMessageBox.confirm(
      '请确保活动开始时，您所自行购买的保险外于生效状态，因保险未按时生效所产生的一切损失由您自行承担。您自行购买的保险需承保活动主办方所可能面临的赔偿责任，为组织者责任险、旅行社责任险等险种。建议非旅行社单位，及时为您自身投保组织者责任险，旅行社单位应依照法律规定投保旅行社责任险。',
      '特别提示',
      {
        confirmButtonText: '确定',
        type: 'warning'
      }
    )
  }
}
const setActive = id => {
  activeNav.value = id
}
const inputVisible = ref(false)
const tagValue = ref('')
const InputRef = ref(null)
const editableInput = ref([])
const editable = ref([])
const editText = ref('')

const isLiabilitySelf = computed(() => insurence.liability === false)
const isAccidentSelf = computed(() => insurence.accidence === false)
const chanels = ref([
  {
    id: '1',
    name: '默认推送',
    date_created: undefined,
    channel_price: undefined,
    image: undefined
  }
])
const isGroupLimit = computed(() => radio1.value)
const upShalveDatas = ref({
  channel_id: undefined,
  product_launching_time: undefined,
  product_expiration_time: undefined,
  recruit_total: 0,
  reconsideration: undefined
})
const features = ref([
  {
    featureId: 1,
    name: '国际奖项',
    image: undefined,
    thumbnail: undefined
  },
  {
    featureId: 2,
    name: '国家奖项',
    image: undefined,
    thumbnail: undefined
  }
])
const categoryOptions = ref([
  {
    categoryId: 1,
    name: '体育',
    image: undefined,
    thumbnail: undefined
  },
  {
    categoryId: 2,
    name: '地理',
    image: undefined,
    thumbnail: undefined
  }
])
const attributeSelect = ref(0)
const form = ref({
  fullName: undefined,
  groupPeriodList: [
    {
      activityTimeRange: [undefined, undefined]
    }
  ],
  status: undefined,
  productStatus: undefined,
  categoryList: [],
  groupLimitSize: 0,
  parentProductId: 0,
  multigroupProductType: undefined,
  groupLimitIf: false,
  activityStartDateTime: undefined,
  activityEndDateTime: undefined,
  priceOriginal: 0,
  priceSelling: 0,
  generalFeatureList: [],
  sizeValid: 0,
  ageMin: 0,
  cautions: undefined,
  ageMax: 18,
  stayIf: false,
  activityMode: undefined,
  difficulty: 0,
  activityType: [],
  teacherStudent: { teacher: 0, student: 0 },
  videoShortResource: undefined,
  certifiedFeatureList: [
    {
      certificate: undefined,
      featureList: []
    }
  ],
  languageList: [],
  insuranceInfo: {
    liabilityInsuranceSelfIf: isLiabilitySelf.value,
    accidentInsuranceSelfIf: isAccidentSelf.value,
    liabilityInsuranceGradeId: undefined,
    liabilityInsuranceSelfDetails: undefined,
    accidentInsuranceSelfDetails: undefined,
    accidentInsuranceGradeId: undefined
  },
  mainSlogon: undefined,
  subSlogon: undefined,
  theme: undefined,
  themeDetails: undefined,
  advantageList: [
    {
      title: undefined,
      detail: undefined
    }
  ],
  gains: undefined,
  refundPlanType: 'CAUSE',
  outlineList: [
    {
      title: undefined,
      detail: undefined
    }
  ],
  venue: undefined,
  food: {
    type: undefined,
    detail: undefined,
    license: undefined
  },
  accommodations: undefined,
  teachingAids: undefined,
  team: {
    teamNums: 0,
    detail: undefined,
    // 是否有专职拍摄人员
    isProfessional: false,
    // 拍摄人数
    captureNums: 0,
    captureDetail: undefined
  },
  medicalCare: undefined,
  mustKnow: undefined,
  dailyScheduleList: [
    {
      dailyIndex: 1,
      itemList: [
        {
          timeRange: [undefined, undefined],
          detail: undefined
        }
      ]
    }
  ],
  refundPlanList: [
    { leftDays: 0, rightDays: 0, percentTotal: 0 },
    { leftDays: 0, rightDays: 0, percentTotal: 0 },
    { leftDays: 0, rightDays: 0, percentTotal: 0 }
  ],
  activityAttributeList: [

  ],
  activityLocation: {
    startLocation: [],
    endLocation: [],
    startLocationDetailed: undefined,
    endLocationDetailed: undefined
  },
  preparation: undefined,
  emergencyContact: {
    name: undefined,
    title: undefined,
    phone: undefined,
    detail: undefined
  },
  unifiedClothing: undefined,
  clothingDetail: undefined,
  horizontalShowsResourceList: [],
  verticalShowsResourceList: [],
  facilityShowsResourceList: [],
  briefing: {
    startDate: undefined,
    timeRange: [undefined, undefined],
    type: undefined,
    detail: undefined
  },
  preparation: undefined,
  priceInclude: undefined,
  priceExclude: undefined,
  priceInsuranceDetail: undefined,
})

// const isMultigroup = computed(() => {
//   return form.value.multigroupProductType != 'MULTIGROUP_SUB'
// })
const showPreview = ref(false)
const imgPreview = ref(undefined)

//删除活动属性
const tagClose = (tag) => {
  const index = form.value.activityAttributeList.findIndex(obj => obj.attributeName == tag.attributeName)
  form.value.activityAttributeList.splice(index, 1)
}

const addAttribute = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.focus()
  })
}

//添加活动属性
const addAttributeConfirm = () => {
  if (tagValue.value) {

    if (form.value.activityAttributeList.findIndex(obj => obj.attributeName == tagValue.value) != -1) {
      ElMessage({
        message: '属性名不能重复',
        type: 'error'
      })
      inputVisible.value = false
      tagValue.value = ''
      return
    }

    if (form.value.activityAttributeList.length >= 4) {
      ElMessage({
        message: '最多设置4个属性',
        type: 'error'
      })
      inputVisible.value = false
      tagValue.value = ''
      return
    }

    const attribute = {
      attributeName: tagValue.value,
      optionList: [
        {
          optionName: '',
          addPrice: 0,
          availableNum: 0
        }
      ]
    }
    form.value.activityAttributeList.push(attribute)
    if (form.value.activityAttributeList.length == 1) {
      attributeSelect.value = 0
    }
  }
  inputVisible.value = false
  tagValue.value = ''
}

// 编辑属性tag input显示
const showEditTagInput = (index) => {
  editText.value = form.value.activityAttributeList[index].attributeName
  editable.value[index] = true
  nextTick(() => {
    editableInput.value[0].focus()
  })
}

const editableInputConfirm = (item, index) => {
  if (item.attributeName && item.attributeName.length > 0) {
    editable.value[index] = false
  } else {
    ElMessage({
      message: '请输入编辑后的属性名',
      type: 'error'
    })
  }
}

const editableInputBlur = (item, index) => {
  if (item.attributeName && item.attributeName.length > 0) {
    let flag = form.value.activityAttributeList.findIndex((obj, i) => {
      if (i != index) {
        return obj.attributeName == item.attributeName
      }
    }) != -1
    if (flag) {
      ElMessage({
        message: '属性名不能重复',
        type: 'error'
      })
      form.value.activityAttributeList[index].attributeName = editText.value
    }
    editable.value[index] = false
  } else {
    ElMessage({
      message: '请输入编辑后的属性名',
      type: 'error'
    })
    return
  }
}

const getPreview = () => {
  showPreview.value = true
  request
    .post(userApi.preview, {
      id: route.params.id
    })
    .then(value => {
      imgPreview.value = value?.details.qr_img || undefined
    })
}

// const difftime = computed(() => {
//   const times = []
//   form.value.groupPeriodList.forEach(t => {
//     const t1 = getTime(t.activityTimeRange[0])
//     const t2 = getTime(t.activityTimeRange[1])
//     times.push(Math.ceil(Math.abs((t1 - t2) / (1000 * 60 * 60 * 24))) + 1)
//   })
//   let dailyIndex = 1
//   const dailyItem = {
//     dailyIndex: undefined,
//     itemList: [
//       {
//         timeRange: [undefined, undefined],
//         detail: undefined
//       }
//     ]
//   }
//   const newDailys = JSON.parse(JSON.stringify(new Array(Math.abs(times[0] || 0)).fill(dailyItem)))
//   form.value.dailyScheduleList = [...form.value.dailyScheduleList, ...newDailys].slice(0, times[0]).map((daily) => {
//     daily.dailyIndex = dailyIndex++
//     return daily
//   })
//   return times
//   function getTime (dateString = undefined) {
//     if (!dateString) return new Date().getTime()
//     const times = dateString?.split(/[-:]/)
//     times[2] = times?.[2]?.slice(0, 2) || undefined
//     const [year, month, day] = times.map(Number)
//     return new Date(year, month - 1, day).getTime()
//   }
// })

const getDurationTime = (beginTime, endTime) => {
  const begin = Date.parse(beginTime)
  const end = Date.parse(endTime)
  if (end && begin) {
    return Number(((end - begin) / 1000 / 3600 / 24).toFixed(0))
  } else {
    return 0
  }
}

const validateForm = (formEl) =>
  // formEl.validate(valid).catch(() => {
  //   document.querySelector('.is-error').scrollIntoView()
  // })
  formEl.validate((valid) => {
    if (document.querySelector('.is-error')) {
      document.querySelector('.is-error').scrollIntoView()
    }
    return valid
  })
const addNewBack = () => {
  form.value.refundPlanList.splice(-1, 0, {
    leftDays: 0,
    rightDays: 0,
    percentTotal: 0
  })
}
const addActivityAttribute = () => {
  const newAttribute = {
    optionName: '',
    addPrice: 0,
    availableNum: 0
  }
  form.value.activityAttributeList[attributeSelect.value].optionList.push(newAttribute)
}
const deleteActivityAttribute = (i) => {
  if (form.value.activityAttributeList[attributeSelect.value].optionList.length <= 1) {
    ElMessage({
      message: '至少保存一个属性值',
      type: 'error'
    })
    return
  }
  form.value.activityAttributeList[attributeSelect.value].optionList.splice(i, 1)
}
const confirmUpShalve = () => {
  if (active.value === 1) {
    request
      .post(
        userApi.product,
        {
          productId: route.params.id,
          providerId: store.user?.id
          // user: {
          //   id: store.user?.id
          // },
          // version: '1.0.0',
          // create_reason: '商品上架',
          // work_line_id: 1400,
          // work_operation: 4600,
          // content: {
          //   id: route.params.id,
          //   ...upShalveDatas.value
          // }
        },
        {
          message: true
        }
      )
      .then(r => {
        dialogVisible.value = false
        router.push('/user/workbench/productLunch')
      })
  }
  active.value = active.value === 0 ? 1 : 0
}
const onUploadSuccess = (r, key) => {
  console.log(key)
  form.value[key] = {
    url: ''
  }
  form.value[key].url = r.response.details.image_url
}

//发送请求 创建商品
const createProduct = async (formEl) => {
  const illeageWord = isIlleagle(JSON.stringify(form.value))
  if (illeageWord != '') {
    ElMessageBox.confirm(
      `经系统检测，您发布的商品信息存在违规描述:"${illeageWord}"。为保证平台的合法性和用户的权益，您须修改涉及违禁词汇的文字表述，否则无法完成商品上架。如果您对此有任何疑问或建议，请随时与我们联系，感谢您的支持与理解。`,
      '商品信息存在违规描述',
      {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }
    )
    return
  }
  try {
    const valid = await validateForm(formEl)
    if (form.value.priceSelling > form.value.priceOriginal) {
      ElMessage({
        type: 'error',
        message: '未划线价不能超过划线价！'
      })
      return
    }
    if (valid) {
      form.value.certifiedFeatureList = form.value.certifiedFeatureList.map(item => ({
        ...item,
        certificate: item.certificate?.url,
      }))
      //这里是取值相反
      form.value.insuranceInfo.liabilityInsuranceSelfIf = !insurence.liability
      form.value.insuranceInfo.accidentInsuranceSelfIf = insurence.accidence
      //dateindex 与 dailyIndex置换
      form.value.dailyScheduleList.map((a) => {
        a.dailyIndex = a.dateIndex || 0
        return a
      })
      console.log(form.value)
      const response = await request.post(
        userApi.createProduct,
        {
          ...form.value,
          providerId: store.providerId
        },
        {
          message: true,
          loading: true
        }
      )
      if (response) {
        // 清除缓存
        window.localStorage.removeItem('camptogoProd')
        router.push('/user/workbench/productLunch')
      }
    }
  } catch (error) {
    // 处理可能的错误
    console.error('Error:', error)
  }
}
const saveDraft = () => {
  form.value.certifiedFeatureList = form.value.certifiedFeatureList.map(item => ({
    ...item,
    certificate: item.certificate?.url,
  }))
  //这里是取值相反
      form.value.insuranceInfo.liabilityInsuranceSelfIf = !insurence.liability
  form.value.insuranceInfo.accidentInsuranceSelfIf = insurence.accidence
  //dateindex 与 dailyIndex置换
  form.value.dailyScheduleList.map((a) => {
    a.dailyIndex = a.dateIndex || 0
    return a
  })
  request
    .post(
      userApi.updateProduct,
      {
        providerId: store.providerId,
        ...form.value,
        // generalFeatureList: form.value.generalFeatureList.map(item => item.categoryId),
        isDraft: true,
        content: {
          providerId: store.providerId,
          ...form.value
        },
        create_reason: '保存草稿',
        user: { id: store.user.id },
        version: '1.0.0',
        work_line_id: 1400,
        work_operation: 4900
      },
      {
        message: true
      }
    )
    .then(r => {
      router.push('/user/workbench/productLunch')
    })
}

const copyProduct = () => {
  form.value.certifiedFeatureList = form.value.certifiedFeatureList.map(item => ({
    ...item,
    certificate: item.certificate?.url,
  }))
  //这里是取值相反
      form.value.insuranceInfo.liabilityInsuranceSelfIf = !insurence.liability
  form.value.insuranceInfo.accidentInsuranceSelfIf = insurence.accidence
  //dateindex 与 dailyIndex置换
  form.value.dailyScheduleList.map((a, b) => {
    a.dailyIndex = a.dateIndex || 0
    return a
  })
  request
    .post(
      userApi.updateProduct,
      {
        providerId: store.providerId,
        ...form.value,
        isDraft: true,
        content: {
          providerId: store.providerId,
          ...form.value
        },
        create_reason: '复制商品',
        user: { id: store.user.id },
        version: '1.0.0',
        work_line_id: 1400,
        work_operation: 4900
      },
      {
        message: true
      }
    )
    .then(r => {
      router.push('/user/workbench/productLunch')
    })
}
// 新创建的
const isNewProdoct = ref(false)

const deleteGroupPeriod = (index) => {
  if (form.value.groupPeriodList.length === 1) {
    ElMessage({
      message: '至少保存一个团期',
      type: 'error'
    })
    return
  }
  form.value.groupPeriodList.splice(index, 1)
}
//多团期情况 格式化各个团期天数与第一个团期相同
const formatDuration = (dayIndex) => {
  if (form.value.groupPeriodList.length === 1) {
    return
  }
  if(form.value.groupPeriodList.length > 1 && dayIndex == 0){
    form.value.groupPeriodList.splice(1)
  }
  var duration = getDurationTime(form.value.groupPeriodList[0].activityTimeRange[0], form.value.groupPeriodList[0].activityTimeRange[1]) * 3600 * 24 * 1000
  let begin = Date.parse(form.value.groupPeriodList[dayIndex].activityTimeRange[0])
  let end = new Date(begin + duration)
  let year = end.getFullYear()
  let month = ("0" + (end.getMonth() + 1)).slice(-2)
  let day = ("0" + end.getDate()).slice(-2)
  let endDay = year + '-' + month + '-' + day + "T00:00"
  form.value.groupPeriodList[dayIndex].activityTimeRange[1] = endDay

}
// //团期负值校验 天数为负值 强制为当前天开始 当前天结束
const isBeforeBeginDay = (dayIndex) => {
  const duration = getDurationTime(form.value.groupPeriodList[dayIndex].activityTimeRange[0], form.value.groupPeriodList[dayIndex].activityTimeRange[1])
  if (duration < 0) {
    form.value.groupPeriodList[dayIndex].activityTimeRange[1] = form.value.groupPeriodList[dayIndex].activityTimeRange[0]
  }
}
const addFeature = () => {
  form.value.certifiedFeatureList.push({
    certificate: undefined,
    featureList: []
  })
}
const deleteFeature = (index) => {
  if (form.value.certifiedFeatureList.length === 1) {
    ElMessage({
      message: '至少保存一个认证',
      type: 'error'
    })
    return
  }
  form.value.certifiedFeatureList.splice(index, 1)
}

//优势
const addAdvantage = () => {
  form.value.advantageList.push({
    title: undefined,
    detail: undefined
  })
}
const deleteAdvantage = (index) => {
  if (form.value.advantageList.length === 1) {
    ElMessage({
      message: '至少保存一个优势',
      type: 'error'
    })
    return
  }
  form.value.advantageList.splice(index, 1)
}
const addOutline = () => {
  form.value.outlineList.push({
    title: undefined,
    detail: undefined
  })
}
const deleteOutline = (index) => {
  if (form.value.outlineList.length === 1) {
    ElMessage({
      message: '至少保存一个提纲',
      type: 'error'
    })
    return
  }
  form.value.outlineList.splice(index, 1)
}
const addDaily = arr => {
  arr.push({
    timeRange: [undefined, undefined],
    detail: undefined
  })
}
const deleteDaily = (item, daily) => {
  if (item.itemList.length === 1) {
    ElMessage('至少保留一条日程安排')
    return
  }
  item.itemList = item.itemList.filter(_daily => _daily !== daily)
}
const deleteProduct = () => {
  request
    .post(
      userApi.deleteProduct,
      { productId: form.value.productId },
      {
        message: true
      }
    )
    .then(() => {
      router.push('/user/workbench/productLunch')
    })
}
watch(
  () => form.value,
  newValue => {
    if (isNewProdoct.value) {
      window.localStorage.setItem('camptogoProd', JSON.stringify(newValue))
    }
  },
  {
    deep: true
  }
)
watch(
  () => insurence.accidence,
  () => {
    form.value.accident_insurance_self_if = isAccidentSelf.value
  }
)
watch(
  () => insurence.liability,
  () => {
    form.value.liability_insurance_self_if = isLiabilitySelf.value
  }
)
watch(
  () => form.value.activityAttributeList,
  newVal => {
    if (attributeSelect.value > form.value.activityAttributeList.length - 1) {
      attributeSelect.value = form.value.activityAttributeList.length - 1
    }
  },
  {
    deep: true
  }
)
onMounted(() => {
  isLoading.value = true
  // 获取保险挡位列表
  request.post(userApi.getInsuranceGrade, {
    insuranceType: 'LIABILITY'
  }).then(res => {
    liabilityGradeList.value = res.details
  })
  request.post(userApi.getInsuranceGrade, {
    insuranceType: 'ACCIDENT'
  }).then(res => {
    accidentGradeList.value = res.details
  })
  // 不是发布新的商品
  if (!/new/.test(window.location.href)) {
    request
      .post(userApi.getProduct, {
        productId: route.params.id
      }, {
        loading: true
      })
      .then(r => {
        const product = r.details
        if (!product) return
        Reflect.ownKeys(product).forEach(key => {
          if (typeof product[key] === 'undefined') product[key] = form.value[key]
          if (Array.isArray(product[key]) && !product[key].length) {
            product[key] = form.value[key]
          }
        })
        insurence.liability = product.insuranceInfo?.liabilityInsuranceSelfIf
        insurence.accidence = product.insuranceInfo?.accidentInsuranceSelfIf
        product.categoryList = product.categoryList.map(item => item.categoryId.toString())
        product.certifiedFeatureList = product.certifiedFeatureList.map(item => ({
          ...item,
          featureList: item.featureList?.map(item => item.featureId)
        }))
        product.dailyScheduleList = product.dailyScheduleList.map(item => ({
          ...item,
          itemList: item.itemList.map(item => ({
            ...item,
            timeRange: [item.startTime ? item.startTime : null, item.endTime ? item.endTime : null]
          }))
        }))
        if (!product.food) {
          product.food = {
            type: undefined,
            detail: undefined,
            license: undefined
          }
        }
        product.briefing.timeRange = product.briefing?.timeRange != null ? product.briefing.timeRange : [undefined, undefined]
        const { startProvince, startCity, startDistrict } = product.activityLocation || {}
        let startLocation
        if (startProvince != 'null' && startProvince) {
          startLocation = [startProvince, startCity, startDistrict]
        }
        product.activityLocation.startLocation = startLocation || []
        const { endProvince, endCity, endDistrict } = product.activityLocation || {}
        let endLocation
        if (endProvince != 'null' && endProvince) {
          endLocation = [endProvince, endCity, endDistrict]
        }
        product.activityLocation.endLocation = endLocation || []
        activityArea.value = /(省|市|自治区|行政区)/.test(product.activityLocation.startLocation) ? 0 : 1
        if (product.multigroupProductType == 'MULTIGROUP_SUB') {
          // 为子商品,只会有一个团期
          product.multigroupProductType = 'NOT_MULTIGROUP'
        }
        if (product.multigroupProductType == 'NOT_MULTIGROUP') {
          product.groupPeriodList[0].activityTimeRange = [
            product.activityStartDateTime ? product.activityStartDateTime : null,
            product.activityEndDateTime ? product.activityEndDateTime : null
          ]
        }
        form.value = product
      })
      .finally(e => (isLoading.value = false))
    request.post(userApi.channel).then(r => {
      chanels.value = r.details.filter(c => c.name === '默认推送')
    })
  } else {
    const draft = window.localStorage.getItem('camptogoProd')
    isNewProdoct.value = true
    if (draft) {
      // form.value = JSON.parse(draft)
    }
  }
  isLoading.value = false
  window.queueMicrotask(() => {
    request.post(userApi.getInsurceAudit).then(resp => {
      insurenceAuditDetail.value = resp.detail
    })
    request.post(userApi.getFeatures).then(resp => {
      features.value = resp.details
    })
    request.post(userApi.getCategories).then(resp => {
      categoryOptions.value = resp.details
    })
  })
})
//导航逻辑
const goToPosition = id => {
  const element = document.getElementById(id)
  element.scrollIntoView()
}
</script>
<style lang="scss">
.product-detail {
  .form> {
    div.is-required {
      ::before {
        display: none;
      }
    }
  }

  .el-dialog {
    .el-dialog__body {
      display: flex;
      justify-content: flex-start;
      padding-left: 50px;
      align-items: center;
    }

    .el-steps--horizontal {
      width: 300px;
    }

    .el-dialog__footer {
      padding-right: 100px;
    }
  }

  .w-20 {
    min-height: 24px;
    min-width: 5rem;
    font-size: 12px;

    .el-input__inner {
      height: 24px;
    }
  }

  .scheduls {
    min-width: 500px;
    margin-bottom: 30px;
  }

  .product-nav {
    position: fixed;
    left: 90%;
    top: 80px;
    margin-top: 40px;
    border-left: none;

    li {
      list-style: none;
      margin: 23px;
      cursor: pointer;
    }

    .nav-active {
      span {
        position: relative;
        width: 2px;
        height: 20px;
        color: var(--el-color-primary);
      }

      span:before {
        content: '';
        position: absolute;
        left: -11px;
        width: 2px;
        height: 100%;
        background-color: var(--el-color-primary);
        transform: scale(1.5, 2);
        z-index: 99;
      }
    }

    span {
      position: relative;
      height: 20px;
      color: #8a8a8a;
    }

    span:before {
      content: '';
      position: absolute;
      top: 0px;
      left: -11px;
      width: 1.5px;
      height: 100%;
      background-color: #00000026;

      transform: scale(1, 2);
    }
  }

  .product-form {
    width: 80%;
    // width: 1000px;
  }

  padding-bottom: 80px;

  .desc {
    color: rgba(0, 0, 0, 0.45061);
    font-size: smaller;
    padding-left: 10px;
  }

  .hardware {
    width: 100%;
    margin: 20px 0;

    .el-textarea {
      width: 80%;
      height: 100%;

      .el-textarea__inner {
        height: 100%;
      }
    }
  }

  .grid {
    display: grid;
    grid-template-columns: 120px 120px 160px 120px;
    gap: 0 60px;

    .product-detail .el-tooltip__trigger {
      margin-left: 0px;
    }
  }

  .schdule {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    margin-top: 10px;
    background: #f2f2f2;
  }

  .add {
    border: 1px dotted black;
    width: 90%;
    text-align: center;
  }

  .boxs {
    .add {
      width: 100%;
      margin: 10px 0;
    }
  }

  .schdule-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}

.back-ontainer {
  padding-top: 10px;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  width: 90%;
  display: flex;
  flex-direction: column;

  p {
    display: inline;
    margin: 10px;
  }

  .twocolum {
    padding-bottom: 10px;
  }

  .normal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #f2f2f2;

    .el-button {
      margin-left: 10px;
      border: 1px dashed #000000;
      width: 296px;
      font-size: 14px;
    }
  }

  .btn-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #f2f2f2;

    .el-button {
      margin-left: 10px;
      border: 1px dashed #000000;
      font-size: 14px;
    }
  }

  .greensection {
    background: #f2ffd7;
    color: #93d500;
    display: flex;
    text-align: center;
  }

  section {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;

    >div {
      width: 50%;
      border: 1px solid #f2f2f2;
      margin: 0;
      padding: 10px;
    }

    .refund-delete {
      position: absolute;
      right: -40px;
      top: 20px;
    }
  }
}

.title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}

.el-icon {
  margin-left: 10px;
}

.bidMethod {
  position: relative;

  .smartTip {
    position: absolute;
    left: -113px;
    top: 6px;
  }
}

.features {
  position: relative;

  &::after {
    content: '自定义';
    position: absolute;
    right: 40px;
    top: 0;
    color: #93d500;
  }

  .el-popper {
    padding-top: 56px;

    ul {
      display: flex;
      width: 654px;
      height: 100px;
      flex-wrap: wrap;
      position: relative;
      justify-content: space-around;

      &::before {
        position: absolute;
        content: '';
        top: -6px;
        height: 2px;
        width: 800px;
        z-index: 999;
        background-color: lightgray;
      }

      li {
        width: 80px;
        padding: 0;
        text-align: center;
        border: 1px solid lightgray;
        border-radius: 4px;
        margin: 8px;
      }
    }

    position: relative;

    &::before {
      top: 20px;
      font-size: 16px;
      position: absolute;
      left: 20px;
      content: '活动特色';
    }

    &::after {
      top: 20px;
      font-size: 16px;
      position: absolute;
      left: 90px;
      color: black;
      opacity: 45%;
      content: '(可多选)';
    }
  }
}
</style>
