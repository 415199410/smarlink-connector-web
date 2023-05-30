<template>
  <div class="wrap">
    <div class="header">
      <label>
        <span class="headerApp">南京锐意国际贸易有限公司</span>
      </label>
    </div>
    <el-form ref="form" :inline="true" :model="form" label-width="90px" size="small" label-position="left" :rules="rules" :disabled="showType">
      <div class="content">
        <div class="formItem">
          <el-divider content-position="center">品控部验货报告</el-divider>
          <el-form-item label-width="115px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">工厂：</span>
						</span>
            <el-input class="inputDeep" v-model="form.vendor" readonly />
          </el-form-item>
          <el-form-item label-width="115px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">采购合同号：</span>
						</span>
            <el-input class="inputDeep" v-model="form.orderNo" :placeholder="form.orderNo" readonly />
          </el-form-item>
          <el-form-item label-width="115px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">业务员：</span>
						</span>
            <el-input class="inputDeep" v-model="form.businPerson" :placeholder="form.businPerson" readonly />
          </el-form-item>
          <el-form-item label-width="115px" prop="checkItemTimes">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">验货次数：</span>
						</span>
            <el-input class="inputDeep2" v-model.number="form.checkItemTimes" placeholder="请输入数字" />
          </el-form-item>
          <el-form-item label-width="115px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">工厂交期：</span>
						</span>
            <el-input class="inputDeep" v-model="form.faDate" :placeholder="form.faDate" readonly />
          </el-form-item>
          <el-form-item label-width="115px" prop="importance">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">重要性：</span>
						</span>
            <el-input class="inputDeep" v-model="form.importance" :placeholder="form.importance" readonly />
          </el-form-item>
          <div style="text-align: center; width: 90%;margin-left: 3%;">
            <el-form-item>
              <el-radio-group v-model="form.isRepect">
                <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											常规验货
										</span>
                </el-radio>
                <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											复检
										</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="headerApp2">
          <span>货号信息</span>
        </div>
        <div style="margin-top:-3%">
          <el-divider style="color: #409EFF;font-weight: bold;"></el-divider>
        </div>
        <div class="labelcont">
          <div v-if="showMainItem">
            <el-divider content-position="center">
              <span style="font-size:12px;font-weight:bold">主产品货号：{{form.mainName}}</span>
            </el-divider>
          </div>
          <el-divider content-position="center">
            <span style="font-size:12px;font-weight:bold">货品：{{form.itemName}}</span>
          </el-divider>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;border:100px">待检数量：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item prop="custSumItem" label-width="80px">
								<span slot="label">
									<span style="font-size:12px;color:black;">总数量：</span>
								</span>
                <el-input class="inputDeep3" v-model.number="form.custSumItem" ref="inputFocus1" placeholder="输入数字" />
              </el-form-item>
              <el-form-item prop="custSumBox" label-width="80px">
								<span slot="label">
									<span style="font-size:12px;color:black;">总箱数：</span>
								</span>
                <el-input class="inputDeep3" v-model.number="form.custSumBox" ref="inputFocus2" placeholder="输入数字" />
              </el-form-item>
            </div>
          </el-row>
          <div style="text-align: left;">
            <el-form-item label-width="140px">
							<span slot="label">
								<span style="margin-left: 12%;font-size:15px;color:black;">数量单位:</span>
							</span>
              <el-input class="inputDeep3" v-model="form.numUnit" ref="inputFocus2" />
            </el-form-item>
          </div>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">包装数量：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item prop="boxPackQuantity" label-width="5px">
                <span slot="label">
									<span style="font-size:1px;color:black;"> </span>
								</span>
                <el-input class="inputDeep15 inputDeep4" v-model.number="form.boxPackQuantity">
                  <span slot="append" style = "margin-left: -100%;">只/中盒</span>
                </el-input>
              </el-form-item>
              <el-form-item prop="outBoxPackQuantity" label-width="5px">
                <span slot="label">
									<span style="font-size:1px;color:black;"> </span>
								</span>
                <el-input class="inputDeep15 inputDeep4" v-model.number="form.outBoxPackQuantity">
                  <span slot="append" style = "margin-left: -100%;">只/外箱</span>
                </el-input>
              </el-form-item>
            </div>
          </el-row>
          <div style="margin-top: 2%;margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">抽验数量：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item label-width="50px" prop="middleCheckQuantity">
								<span slot="label">
									<span style="font-size:12px;color:black;">中盒:</span>
								</span>
                <el-input class="inputDeep16" v-model.number="form.middleCheckQuantity" />
              </el-form-item>
              <el-form-item label-width="50px" prop="outCheckQuantity" >
								<span slot="label" >
									<span style="font-size:12px;color:black;">外箱:</span>
								</span>
                <el-input class="inputDeep16" v-model.number="form.outCheckQuantity" />
              </el-form-item>
              <el-form-item label-width="50px" prop="productQuantity">
								<span slot="label">
									<span style="font-size:12px;color:black;">产品:</span>
								</span>
                <el-input class="inputDeep16" v-model.number="form.productQuantity" />
              </el-form-item>
            </div>
          </el-row>
          <div style="margin-top: 2%;margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">外箱尺寸：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item label-width="50px">
								<span slot="label">
									<span style="font-size:12px;color:black;">&#12288; 长:</span>
								</span>
                <el-input class="inputDeep16" v-model="form.length" />
              </el-form-item>
              <el-form-item label-width="50px">
								<span slot="label">
									<span style="font-size:12px;color:black;">&#12288; 宽:</span>
								</span>
                <el-input class="inputDeep16" v-model="form.width " />
              </el-form-item>
              <el-form-item label-width="50px">
								<span slot="label">
									<span style="font-size:12px;color:black;">&#12288; 高:</span>
								</span>
                <el-input class="inputDeep16" v-model="form.height" />
              </el-form-item>
            </div>
          </el-row>
          <div style="text-align: left;">
            <el-form-item label-width="90px">
							<span slot="label">
								<span style="margin-left: 12%;font-size:15px;color:black;">尺寸单位:</span>
							</span>
              <el-select v-model="form.sizeUnit" placeholder="请选择" size="small">
                <el-option
                  v-for="item in sizeUnit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="text-align: left;">
            <el-form-item label-width="90px">
							<span slot="label">
								<span style="margin-left: 12%;font-size:15px;color:black;">实际称重:</span>
							</span>
              <el-input class="inputDeep5" v-model="form.weight" />
            </el-form-item>
          </div>
          <div style="text-align: left;">
            <el-form-item label-width="90px">
							<span slot="label">
								<span style="margin-left: 12%;font-size:15px;color:black;">称重单位:</span>
							</span>
              <el-select v-model="form.heightUnit" placeholder="请选择" size="small">
                <el-option
                  v-for="item in heightUnit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-row>
            <el-form-item prop="checkResult">
							<span slot="label">
								<span style="margin-left: 2%;font-size:15px;color:black;">验货结果:</span>
							</span>
              <el-radio-group v-model="form.checkResult">
                <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											合格
										</span>
                </el-radio>
                <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											不合格
										</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">缺陷数量：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item label-width="100px">
								<span slot="label">
									<span style="font-size:12px;color:black;">主要缺陷数量：</span>
								</span>
                <el-input class="inputDeep16" v-model="form.mainDefectQuantity" />
              </el-form-item>
              <el-form-item label-width="100px">
								<span slot="label">
									<span style="font-size:12px;color:black;">次要缺陷数量：</span>
								</span>
                <el-input class="inputDeep16" v-model="form.secondaryDefectQuantity" />
              </el-form-item>
            </div>
          </el-row>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">主要缺陷详细说明：</span>
          </div>
          <el-form-item label-width="10px">
            <el-input class="inputDeep6" v-model="form.productDes" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">次要缺陷详细说明：</span>
          </div>
          <el-form-item label-width="10px">
            <el-input class="inputDeep6" v-model="form.secondaryProductDes" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">产品类别：</span>
          </div>
          <div style="margin-left: 3%;margin-bottom: 2%">
          <el-form-item label-width="10px">
            <el-select v-model="form.itemType" multiple :multiple-limit="1" filterable allow-create placeholder="请选择" size="small">
              <el-option
                v-for="item in itemType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </div>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">异常类型：</span>
          </div>
          <div style="margin-left: 3%;margin-bottom: 2%">
          <el-form-item label-width="10px">
            <el-select v-model="form.exType" multiple filterable allow-create placeholder="请选择" size="small">
              <el-option
                v-for="item in exType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </div>
        </div>
        <div style = "text-align: center;">
          <el-button size="mini" @click="addDomain()">新增明细</el-button>
          <el-button size="mini" @click="deleteDomain()">删除明细</el-button>
        </div>
        <div style="margin-top: 15px;" v-for="(item, pos) in addDetail">
          <div style="text-align: left;">
            <el-form-item label-width="90px">
							  <span slot="label">
								    <span style="margin-left: 12%;font-size:15px;color:black;">货品名称:</span>
							   </span>
              <el-input class="inputDeep5" v-model ="item.itemName"/>
            </el-form-item>
          </div>
          <el-row>
            <el-form-item prop="checkResult">
							<span slot="label">
								<span style="margin-left: 2%;font-size:15px;color:black;">验货结果:</span>
							</span>
              <el-radio-group v-model="item.result">
                <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											合格
										</span>
                </el-radio>
                <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											不合格
										</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">缺陷数量：</span>
          </div>
          <el-row>
            <div style="text-align: center;">
              <el-form-item label-width="100px">
								<span slot="label">
									<span style="font-size:12px;color:black;">主要缺陷数量：</span>
								</span>
                <el-input class="inputDeep16" v-model="item.main"/>
              </el-form-item>
              <el-form-item label-width="100px">
								<span slot="label">
									<span style="font-size:12px;color:black;">次要缺陷数量：</span>
								</span>
                <el-input class="inputDeep16" v-model="item.sen" />
              </el-form-item>
            </div>
          </el-row>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">主要缺陷详细说明：</span>
          </div>
          <el-form-item label-width="10px">
            <el-input class="inputDeep6" v-model="item.mainMarks" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
          <div style="margin-left: 3%;margin-bottom: 2%">
            <span style="font-size:15px;color:black;">次要缺陷详细说明：</span>
          </div>
          <el-form-item label-width="10px">
            <el-input class="inputDeep6" v-model="item.senMarks" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
        </div>
      </div>
      <div class="content">
        <div class="headerApp2">
          <span>验货情况</span>
        </div>
        <div style="margin-top:-2.5%">
          <el-divider style="color: #409EFF;font-weight: bold;"></el-divider>
        </div>
        <div style="margin-top:-2.5%">
          <el-container style="padding: 0px;margin: 0px;height:300px;">
            <el-aside style="display: flex;flex-direction: column;justify-content: center;
            text-align: center;white-space: pre-wrap;border-right-width: 3px;
            background-color: #b3d8ff;color: black;width:40px;">{{'AQL抽\n检标准'}}</el-aside>
            <el-main style="padding: 0px;margin: 0px;">
              <div style="text-align: center; width: 100%">
                <el-form-item prop="qualityLevel">
                  <el-radio-group v-model="form.qualityLevel" style="margin-top: 10px">
                    <el-radio label="D">
											<span style="font-size:14px;color:black;">
												其他<el-tooltip class="item" effect="light" placement="top">
													<div slot="content">其他</div>
													<i class="el-icon-warning-outline"></i>
												</el-tooltip>
											</span>
                    </el-radio>
                    <el-radio label="C">
											<span style="font-size:14px;color:black;">
												C级<el-tooltip class="item" effect="light" placement="top">
													<div slot="content">采用一般检验水平Ⅱ2.5-4.0标准，致命缺陷0.4、
														<br />主要缺陷2.5标准、次要缺陷4.0标准</div>
													<i class="el-icon-warning-outline"></i>
												</el-tooltip>
											</span>
                    </el-radio>
                    <br/>
                    <el-radio label="B" style="margin-left: -30px;margin-top: 10px">
											<span style="font-size:14px;color:black;">
												B级<el-tooltip class="item" effect="light" placement="top">
													<div slot="content">采用一般检验水平Ⅱ1.5-2.5标准，致命缺陷0.4、
														<br />主要缺陷1.5标准、次要缺陷2.5标准</div>
													<i class="el-icon-warning-outline"></i>
												</el-tooltip>
											</span>
                    </el-radio>
                    <el-radio label="A">
											<span style="font-size:14px;color:black;">
												A级<el-tooltip class="item" effect="light" content="全检" placement="top">
													<i class="el-icon-warning-outline"></i>
												</el-tooltip>
											</span>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div style="text-align: center;width: 100%">
                <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: -2%;">
                  <span style="font-size:14px;color:black;border:100px">致命缺陷：</span>
                </div>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Ac：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.deadlyAc" />
                </el-form-item>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Re：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.deadlyRe" />
                </el-form-item>
              </div>
              <div style="text-align: center;width: 100%">
                <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: -2%;">
                  <span style="font-size:14px;color:black;border:100px">主要缺陷：</span>
                </div>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Ac：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.mainAc" />
                </el-form-item>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Re：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.mainRe" />
                </el-form-item>
              </div>
              <div style="text-align: center;width: 100%">
                <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: -2%;">
                  <span style="font-size:14px;color:black;border:100px">次要缺陷：</span>
                </div>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Ac：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.secondaryAc" />
                </el-form-item>
                <el-form-item label-width="40px">
									<span slot="label">
										<span style="font-size:12px;color:black;">Re：</span>
									</span>
                  <el-input class="inputDeep3" v-model="form.secondaryRe" />
                </el-form-item>
                <el-form-item label-width="60px">
							    <span slot="label">
								    <span style="margin-left:-50%;font-size:13px;color:black;">备注：
								    </span>
							      </span>
                  <el-input class="inputDeep" style="margin-left:-50%;" v-model="form.aqlNote" autocomplete="off" />
                </el-form-item>
              </div>
            </el-main>
          </el-container>
        </div>
      </div>
      <div class="content2">
        <div style="text-align: left; margin-left:2%;width: 100%">
          <el-form-item label-width="110px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">验货箱号：
								<el-tooltip class="item" effect="light" placement="top">
									<div slot="content">开箱检验的箱子的数量不应
										<br />小于出货箱子总数的平方根</div>
									<i class="el-icon-warning-outline"></i>
								</el-tooltip>
							</span>
						</span>
            <el-input class="inputDeep7" v-model="form.inspectionNo" autocomplete="off" />
          </el-form-item>
        </div>
      </div>
      <div class="content2">
        <el-container style="padding: 0px;margin: 0px;height:180px;">
          <el-aside style="display: flex;flex-direction: column;justify-content: center;
            text-align: center;white-space: pre-wrap;border-right-width: 3px;
            background-color: #b3d8ff;color: black;width:40px;">{{'产品正\n确性'}}</el-aside>
          <el-main style="padding: 0px;margin: 0px;">
            <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: 2%;">
              <span style="font-size:14px;color:black;border:100px">规格：</span>
              <el-form-item>
                <el-input class="inputDeep8 inputDeep9" v-model="form.spec" autocomplete="off">
                  <span slot="append">cm</span>
                </el-input>
              </el-form-item>
            </div>
            <div style="text-align: center; width: 100%;">
              <el-form-item>
                <el-radio-group v-model="form.specResult">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											正确
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											错误
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div style="text-align: left; width: 90%;margin-left: 3%;">
              <el-form-item label-width="145px">
								<span slot="label">
									<span style="font-size:13px;color:black;">款式与船样、图对比：
									</span>
								</span>
                <el-radio-group v-model="form.styleResult">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											正确
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											错误
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-main>
        </el-container>
      </div>
      <div class="content2">
        <el-container style="padding: 0px;margin: 0px;height:410px;">
          <el-aside style="display: flex;flex-direction: column;justify-content: center;
            text-align: center;white-space: pre-wrap;border-right-width: 3px;
            background-color: #b3d8ff;color: black;width:40px;">{{'包装\n质量'}}</el-aside>
          <el-main style="padding: 0px;margin: 0px;">
            <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: 2%;">
              <span style="font-size:14px;color:black;border:100px">外箱质量：</span>
              <el-form-item label-width="85px">
                <el-input class="inputDeep11 inputDeep9" v-model="form.outLayer" autocomplete="off">
                  <span slot="append">层瓦楞</span>
                </el-input>
              </el-form-item>
            </div>
            <div style="text-align: center; width: 100%;">
              <el-form-item>
                <el-radio-group v-model="form.outLayerResult">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											较好
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											一般
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="3">
										<span style="font-size:13px;color:black;">
											差
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="4">
										<span style="font-size:13px;color:black;">
											无
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div style="text-align: left;margin-left: 3%;margin-bottom: 2%;margin-top: 2%;">
              <span style="font-size:14px;color:black;border:100px">中/内盒质量：</span>
              <el-form-item label-width="85px">
                <el-input class="inputDeep11 inputDeep9" v-model="form.boxLayer" autocomplete="off">
                  <span slot="append">层瓦楞</span>
                </el-input>
              </el-form-item>
            </div>
            <div style="text-align: center; width: 100%;">
              <el-form-item>
                <el-radio-group v-model="form.boxLayerResult">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:13px;color:black;">
											较好
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:13px;color:black;">
											一般
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="3">
										<span style="font-size:13px;color:black;">
											差
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="4">
										<span style="font-size:13px;color:black;">
											无
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div style="text-align: left; width: 95%;margin-left: 3%;">
              <el-form-item label-width="120px">
								<span slot="label">
									<span style="font-size:14px;color:black;">包装牢固性：
									</span>
								</span>
                <el-radio-group v-model="form.productFirmness">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:14px;color:black;">
											OK
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:14px;color:black;">
											NG
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="3">
										<span style="font-size:14px;color:black;">
											无
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div style="text-align: left; width: 95%;margin-left: 3%;">
              <el-form-item label-width="120px">
								<span slot="label">
									<span style="font-size:14px;color:black;">包装安全性：
									</span>
								</span>
                <el-radio-group v-model="form.packSecurity">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:14px;color:black;">
											OK
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:14px;color:black;">
											NG
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="3">
										<span style="font-size:14px;color:black;">
											无
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div style="text-align: left; width: 95%;margin-left: 3%;">
              <el-form-item label-width="120px">
								<span slot="label">
									<span style="font-size:14px;color:black;">摔箱测试：
									</span>
								</span>
                <el-radio-group v-model="form.dropTest">
                  <el-radio class="inputDeep10" label="1">
										<span style="font-size:14px;color:black;">
											OK
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="2">
										<span style="font-size:14px;color:black;">
											NG
										</span>
                  </el-radio>
                  <el-radio class="inputDeep10" label="3">
										<span style="font-size:14px;color:black;">
											无
										</span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-main>
        </el-container>
      </div>
      <div class="content2">
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="60px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">正唛：
							</span>
						</span>
            <el-radio-group v-model="form.justMark">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left; margin-left:5%;width: 95%;margin-top:-2%;">
            <el-form-item label-width="60px">
							<span slot="label">
								<span style="margin-left:2%;font-size:13px;color:black;">备注：
								</span>
							</span>
              <el-input class="inputDeep7" v-model="form.justMarkNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="60px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">侧唛：
							</span>
						</span>
            <el-radio-group v-model="form.sideMark">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left; margin-left:5%;width: 95%;margin-top:-2%;">
            <el-form-item label-width="60px">
							<span slot="label">
								<span style="margin-left:2%;font-size:13px;color:black;">备注：
								</span>
							</span>
              <el-input class="inputDeep7" v-model="form.sideMarkNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="130px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">标贴正确性：
							</span>
						</span>
            <el-radio-group v-model="form.labelCorrectness">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="130px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">包装正确性：
							</span>
						</span>
            <el-radio-group v-model="form.packCorrectness">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="160px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">外箱条码扫描核对：
							</span>
						</span>
            <el-radio-group v-model="form.outCodeCheck">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left; margin-left:5%;width: 95%;margin-top:-2%;">
            <el-form-item label-width="60px">
							<span slot="label">
								<span style="font-size:13px;color:black;">备注：
								</span>
							</span>
              <el-input class="inputDeep7" v-model="form.outCodeCheckNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div style="text-align: left; margin-left:2%;width: 95%">
          <el-form-item label-width="160px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">中盒条码扫描核对：
							</span>
						</span>
            <el-radio-group v-model="form.boxCodeCheck">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left; margin-left:5%;width: 95%;margin-top:-2%;">
            <el-form-item label-width="60px">
							<span slot="label">
								<span style="margin-left:2%;font-size:13px;color:black;">备注：
								</span>
							</span>
              <el-input class="inputDeep7" v-model="form.boxCodeCheckNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div style="text-align: left; margin-left:2%;width: 98%">
          <el-form-item label-width="170px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">内盒卡纸条码扫描核对：
							</span>
						</span>
            <el-radio-group v-model="form.innerCodeCheck">
              <el-radio class="inputDeep10" label="1">
								<span style="font-size:13px;color:black;">
									正确
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="2">
								<span style="font-size:13px;color:black;">
									错误
								</span>
              </el-radio>
              <el-radio class="inputDeep10" label="3">
								<span style="font-size:13px;color:black;">
									无
								</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left; margin-left:5%;width: 95%;margin-top:-2%;">
            <el-form-item label-width="60px">
							<span slot="label">
								<span style="margin-left:2%;font-size:13px;color:black;">备注：
								</span>
							</span>
              <el-input class="inputDeep7" v-model="form.innerCodeCheckNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="content2">
        <div style="text-align: left; margin-left:2%;width: 100%">
          <el-form-item label-width="80px">
						<span slot="label">
							<span style="margin-left:2%;font-size:14px;color:black;">Logo：
							</span>
						</span>
            <el-checkbox-group v-model="checkedId" >
              <el-checkbox v-for="item in List" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label-width="150px" style="margin-top: -2%;">
             <span slot="label">
               <span style="font-size:14px;color:black;">表面是否生锈：
               </span>
             </span>
            <el-radio-group v-model="form.isRust">
              <el-radio class="inputDeep14" label="1">
                 <span style="font-size:13px;color:black;">
                   是
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="2">
                 <span style="font-size:13px;color:black;">
                   否
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="3">
                 <span style="font-size:13px;color:black;">
                   无
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label-width="200px" style="margin-top: -2%;">
             <span slot="label">
               <span style="font-size:13px;color:black;">产品测试是否合格(功能、3M)
               </span>
             </span>
            <el-radio-group v-model="form.isTestQualified">
              <el-radio class="inputDeep14" label="1">
                 <span style="font-size:13px;color:black;">
                   是
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="2">
                 <span style="font-size:13px;color:black;">
                   否
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="3">
                 <span style="font-size:13px;color:black;">
                   无
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label-width="150px" style="margin-top: -2%;">
             <span slot="label">
               <span style="font-size:14px;color:black;">品控表是否完整：
               </span>
             </span>
            <el-radio-group v-model="form.intact">
              <el-radio class="inputDeep14" label="1">
                 <span style="font-size:13px;color:black;">
                   是
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="2">
                 <span style="font-size:13px;color:black;">
                   否
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="60px" style="margin-top: -2%;">
             <span slot="label">
               <span style="font-size:14px;color:black;">备注：
               </span>
             </span>
            <el-input class="inputDeep7" v-model="form.logoNote" autocomplete="off" />
          </el-form-item>
        </div>
      </div>
      <div class="content2">
        <br/>
        <div style="margin-left: 3%;margin-bottom: 2%;">
          <span style="font-size:15px;color:black;border:100px;">验货结论及处理意见：</span>
        </div>
        <div style="text-align: center; margin-left:2%;width: 90%">
          <el-form-item>
            <el-radio-group v-model="form.handleOpinion">
              <el-radio class="inputDeep14" label="1">
                 <span style="font-size:13px;color:black;">
                   接受
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="2">
                 <span style="font-size:13px;color:black;">
                   拒绝
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="3">
                 <span style="font-size:13px;color:black;">
                   返工
                 </span>
              </el-radio>
              <el-radio class="inputDeep14" label="4">
                 <span style="font-size:13px;color:black;">
                   待议
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: left;">
            <el-form-item label-width="60px" style="margin-top: -3%; ">
             <span slot="label">
               <span style="font-size:14px;color:black;">备注：
               </span>
             </span>
              <el-input class="inputDeep7" v-model="form.handleOpinionNote" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div style="text-align: center;width: 100%">
          <el-form-item style="margin-top: 1%;">
            <el-radio-group v-model="form.handleOpinionResult">
              <el-radio label="1">
                 <span style="font-size:13px;color:black;">
                   中期检验
                 </span>
              </el-radio>
              <el-radio class label="2">
                 <span style="font-size:13px;color:black;">
                   最终检验
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div style="text-align: center;width: 100%">
          <el-form-item style="margin-top: 1%;">
            <el-radio-group v-model="form.orderItemType">
              <el-radio label="1">
                 <span style="font-size:13px;color:black;">
                   主产品验货
                 </span>
              </el-radio>
              <el-radio class label="2">
                 <span style="font-size:13px;color:black;">
                   包材验货
                 </span>
              </el-radio>
              <el-radio label="3">
                 <span style="font-size:13px;color:black;">
                   完整包装
                 </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="content2">
        <div>
          <el-form-item label-width="115px">
           <span slot="label">
             <span style="margin-left:10%;font-size:14px;color:black;">附件：</span>
           </span>
            <el-upload action = "#"
                       :limit=1
                       :accept="phone == true?'application/*':''"
                       :show-file-list = "false"
                       :file-list="fileList"
                       :on-exceed="handleExceedVisio"
                       :http-request="httpRequest"
                       :before-upload="beforeAvatarUpload"
                       :on-remove="handleRemove">
              <i class="el-icon-upload2"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item label-width="115px">
           <span slot="label">
             <span style="margin-left:10%;font-size:14px;color:black;">附件名称：</span>
           </span>
            <el-input class="inputDeep8" v-model="form.fileName" :placeholder="form.fileName" readonly/>
          </el-form-item>
          <el-button icon="el-icon-circle-close" circle @click="clearFile()"></el-button>

        </div>
        <div>
          <el-form-item label-width="115px">
           <span slot="label">
             <span style="margin-left:10%;font-size:14px;color:black;">验货员：</span>
           </span>
            <el-input class="inputDeep8" v-model="form.checkPerson" :placeholder="form.checkPerson" readonly />
          </el-form-item>
        </div>
        <div>
          <el-form-item label-width="115px">
           <span slot="label">
             <span style="margin-left:10%;font-size:14px;color:black;">日期：</span>
           </span>
            <el-date-picker
              v-model="form.date"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label-width="115px">
           <span slot="label">
             <span style="margin-left:10%;font-size:14px;color:black;">工厂负责人：</span>
           </span>
            <el-button type="primary" @click="openSign()" plain>点击签名</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.signChecked" @change="noSign()">无厂长签字</el-checkbox>
          </el-form-item>
        </div>
        <div>
          <el-form-item label-width="100px" prop="signNote">
               <span slot="label">
                 <span style="margin-left:10%;font-size:13px;color:black;">签名备注：
                 </span>
               </span>
            <el-input class="inputDeep7" v-model="form.signNote" autocomplete="off" />
          </el-form-item>
        </div>
        <div v-if="form.signImg" style="width: 100%;border: 3px dashed #e9e9e9;">
          <el-form-item>
            <el-image :src="form.signImg" style="margin-left: 50%;margin-top: -5%;margin-bottom: -20%;width:150px; height: 160px; " fit="contain"
                      :preview-src-list=[form.signImg] >
            </el-image>
          </el-form-item>
        </div>
      </div>
      <div v-if="!showType" style="text-align: center;margin-top:5%;width: 100%;">
        <el-form-item size="large">
          <el-button type="primary" @click="submit(form)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div v-if="showType" style="text-align: center;margin-top:5%;width: 100%;">
      <el-button v-if="this.form.status!='1' && this.form.status!='2'" type="primary" @click="edit()">编辑</el-button>
      <el-button v-if="this.form.status!='1' && this.form.status!='2'" type="warning" @click="upLoadImage()">上传图片</el-button>
      <el-button type="danger" @click="review()">预览PDF</el-button>
    </div>
    <div v-if="showType && (this.form.status!='1' && this.form.status!='2' )" style="text-align: center;margin-top:5%;width: 100%;">
      <el-button type="danger" @click="uploadMail()">发送邮件</el-button>
      <el-button type="danger" @click="reviewImage()">预览图片</el-button>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
        <div class="handBtn">
          <el-button size="mini" @click="handleReset" class="delBtn">重写</el-button>
          <el-button size="mini" @click="handleGenerate" type="primary" class="subBtn">完成</el-button>
        </div>
        <div class="wrapper">
          <vue-esign ref="esign" class="handCenter" :height="1100" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="pdfDialogVisible" fullscreen append-to-body>
        <div style="text-align: center;margin-top:5%;width: 100%;">
          <el-button type="danger" icon="el-icon-remove-outline" @click="narrowButton()">缩小</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="enlargeButton()">放大</el-button>
        </div>
        <div :style="'width:'+ diaWidth +'%;'">
          <div id="remoteSignature-pages-videoAuthenticationDetails-videoAuthenticationDetails">
            <pdf v-for="i in numPages" :key="i" :src="pdfSrc"
                 :page="i" ref="myPdfComponent"></pdf>
          </div>
          <div slot="footer" style="text-align: center;margin-top:5%;width: 100%;">
            <el-button type="primary" @click="goClose()">关闭</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>  &nbsp;
      <div>  &nbsp; </div>
      <div> &nbsp;  </div>
      <div> &nbsp;  </div>
      <div> &nbsp;  </div>
      <div> &nbsp;  </div>
      <div> &nbsp;  </div>
    </div>

  </div>
</template>
<script>
    let loading;
    import pdf from 'vue-pdf-signature';
    import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory';// 解决部分文字不显示的问题
    export default {
        data() {
            return {
                phone:false,
                fileList:[],
                fileType: [ "pdf", "doc", "docx", "xls", "xlsx"],
                timeOutId: 0,
                showMainItem: false,
                diaWidth:100,
                pdfData:'',
                showType: false,
                pdfDialogVisible:false,
                pdfSrc: '',//pdf路径
                numPages: 1,  //  pdf 文件总页数
                //////// oldQuantity:'',
                form: {
                    fileName:'',
                    filePath:'',
                    numUnit:'',
                    idArray:'',
                    id: '',
                    orderItemType:'1',
                    environment:'',
                    vendor: "郭厂",
                    orderNo: "PO-00008406",
                    businPerson: '经仕霞',
                    isRepect:'1',
                    checkItemTimes: '1',
                    item:'1263676',
                    itemName: "ZA-123",
                    mainName:'',
                    custSumItem: '100',//总数量
                    custSumBox: '',//总箱数
                    boxPackQuantity: '', //只/中盒
                    outBoxPackQuantity: '',//只/外箱
                    middleCheckQuantity: '',//中盒
                    outCheckQuantity: '',//外箱
                    productQuantity: '',//产品
                    aqlNote:'',
                    length: '',
                    width: '',
                    height: '',
                    weight: '',
                    intact:'1', //品控表是否完整
                    checkResult: '1',//验货结果
                    mainDefectQuantity: '',//主要缺陷数量
                    secondaryDefectQuantity: '',//次要缺陷数量
                    productDes: '',//不良品详细说明
                    secondaryProductDes:'',
                    inspectionNo: '',
                    mergeNo: [],  //上线后需修改
                    deadlyAc: '',
                    deadlyRe: '',
                    mainAc: '',
                    mainRe: '',
                    secondaryAc: '',
                    secondaryRe: '',
                    qualityLevel: 'C',  //质量等级
                    spec: '',
                    specResult: '1',
                    styleResult: '1',
                    outLayer: '',
                    boxLayer: '',
                    boxLayerResult: '1',
                    outLayerResult: '1',
                    productFirmness: '3',
                    packSecurity: '3',
                    dropTest: '3',
                    justMark: '3',
                    justMarkNote: '',
                    sideMark: '3',
                    sideMarkNote: '',
                    labelCorrectness: '3',
                    packCorrectness: '3',
                    outCodeCheck: '3',
                    outCodeCheckNote: '',
                    boxCodeCheck: '3',
                    boxCodeCheckNote: '',
                    innerCodeCheck: '3',
                    innerCodeCheckNote: '',
                    logo: '',
                    logoNote: '',
                    isRust:'2',
                    isTestQualified:'1', //产品测试是否合格
                    handleOpinion: '1',
                    handleOpinionNote: '',
                    handleOpinionResult: '2',
                    checkPerson: '验货员1',
                    date: new Date(),
                    signImg: '',
                    signChecked: '',
                    signNote: '',
                    conIdList:'',
                    status:'',
                    faDate:'',
                    importance:'',
                    itemType:'',
                    exType:'',
                    sizeUnit:'',
                    heightUnit:'',
                },
                checkedId: [],
                itemType: [
                    {value:"其他", label:"其他"},
                    {value:"桶", label:"桶"},
                    {value:"刮痧板",label:"刮痧板"},
                    {value:"指甲锉",label:"指甲锉"},
                    {value:"折叠指甲锉",label:"折叠指甲锉"},
                    {
                        value: "美容钳",
                        label: "美容钳"
                    }, {
                        value: "不锈钢指甲钳",
                        label: "不锈钢指甲钳"
                    }, {
                        value: "电镀指甲钳",
                        label: "电镀指甲钳"
                    }, {
                        value: "清洁棒",
                        label: "清洁棒"
                    }, {
                        value: "抛光锉",
                        label: "抛光锉"
                    }, {
                        value: "砂纸锉",
                        label: "砂纸锉"
                    }, {
                        value: "美容包",
                        label: "美容包"
                    }, {
                        value: "化妆刷",
                        label: "化妆刷"
                    }, {
                        value: "化妆棉",
                        label: "化妆棉"
                    }, {
                        value: "美容剪",
                        label: "美容剪"
                    }, {
                        value: "浮石",
                        label: "浮石"
                    }, {
                        value: "脚锉",
                        label: "脚锉"
                    }, {
                        value: "EVA指托",
                        label: "EVA指托"
                    }, {
                        value: "玻璃锉",
                        label: "玻璃锉"
                    }, {
                        value: "木制刷",
                        label: "木制刷"
                    }, {
                        value: "浴球",
                        label: "浴球"
                    }, {
                        value: "电动美容工具",
                        label: "电动美容工具"
                    }, {
                        value: "化妆镜",
                        label: "化妆镜"
                    }, {
                        value: "纸卡",
                        label: "纸卡"
                    }, {
                        value: "PVC袋",
                        label: "PVC袋"
                    }, {
                        value: "PET袋",
                        label: "PET袋"
                    }, {
                        value: "PVC盒",
                        label: "PVC盒"
                    }, {
                        value: "PET盒",
                        label: "PET盒"
                    }, {
                        value: "彩盒",
                        label: "彩盒"
                    }, {
                        value: "削笔刀",
                        label: "削笔刀"
                    }, {
                        value: "化妆包",
                        label: "化妆包"
                    }, {
                        value: "眉夹",
                        label: "眉夹"
                    }, {
                        value: "睫毛夹",
                        label: "睫毛夹"
                    }, {
                        value: "耳扒",
                        label: "耳扒"
                    }, {
                        value: "脚皮铲",
                        label: "脚皮铲"
                    }, {
                        value: "泡壳",
                        label: "泡壳"
                    }, {
                        value: "OPP袋",
                        label: "OPP袋"
                    }, {
                        value: "美容套装二",
                        label: "美容套装二"
                    }, {
                        value: "美容套装三",
                        label: "美容套装三"
                    }, {
                        value: "美容套装四",
                        label: "美容套装四"
                    }, {
                        value: "美容套装五",
                        label: "美容套装五"
                    }, {
                        value: "美容套装六",
                        label: "美容套装六"
                    }, {
                        value: "美容套装七",
                        label: "美容套装七"
                    }, {
                        value: "美容套装八",
                        label: "美容套装八"
                    }, {
                        value: "修眉刀",
                        label: "修眉刀"
                    }, {
                        value: "木片锉",
                        label: "木片锉"
                    }, {
                        value: "木签",
                        label: "木签"
                    }, {
                        value: "睫毛刷",
                        label: "睫毛刷"
                    }, {
                        value: "睫毛梳",
                        label: "睫毛梳"
                    }, {
                        value: "梳子",
                        label: "梳子"
                    }, {
                        value: "理发剪",
                        label: "理发剪"
                    }, {
                        value: "硅胶套",
                        label: "硅胶套"
                    }, {
                        value: "硅胶圈",
                        label: "硅胶圈"
                    }, {
                        value: "美容钳盖帽",
                        label: "美容钳盖帽"
                    }, {
                        value: "手皮铲",
                        label: "手皮铲"
                    }, {
                        value: "纸箱",
                        label: "纸箱"
                    }, {
                        value: "睫毛卷",
                        label: "睫毛卷"
                    }, {
                        value: "硅胶脚隔",
                        label: "硅胶脚隔"
                    }, {
                        value: "美镊",
                        label: "美镊"
                    }, {
                        value: "铁盒",
                        label: "铁盒"
                    }, {
                        value: "丝瓜络",
                        label: "丝瓜络"
                    }, {
                        value: "浴帽",
                        label: "浴帽"
                    }, {
                        value: "硅胶刷",
                        label: "硅胶刷"
                    }, {
                        value: "亚克力座",
                        label: "亚克力座"
                    }
                ],
                exType: [
                    {
                        value: "外观",
                        label: "外观"
                    }, {
                        value: "外观/功能",
                        label: "外观/功能"
                    }, {
                        value: "功能",
                        label: "功能"
                    }, {
                        value: "包装",
                        label: "包装"
                    }, {
                        value: "外观/包装",
                        label: "外观/包装"
                    }
                ],
                sizeUnit: [
                    {
                        value: "cm",
                        label: "cm"
                    },
                    {
                        value: "inch",
                        label: "inch"
                    }
                ],
                heightUnit: [
                    {
                        value: "kg",
                        label: "kg"
                    }, {
                        value: "LB",
                        label: "LB"
                    }
                ],
                List: [
                    {value: 1, label: '激光'},
                    {value: 2, label: '钢印'},
                    {value: 3, label: '油墨'},
                    {value: 4, label: '尺寸'},
                    {value: 5, label: '清晰'},
                    {value: 6, label: '颜色'}
                ],
                addDetail: [],
                rules: {
                    checkItemTimes:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    custSumItem:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },{ type: 'number',
                        message: '必须为数字',
                        trigger: 'blur'}],
                    custSumBox:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    },{ type: 'number',
                        message: '必须为数字',
                        trigger: 'blur'}],
                    boxPackQuantity:[/*{
                         required: true,
                         message: '必填项',
                         trigger: 'blur'
                     }*/],
                    outBoxPackQuantity:[/*{
                         required: true,
                         message: '必填项',
                         trigger: 'blur'
                     }*/],
                    middleCheckQuantity:[/*{
                         required: true,
                         message: '必填项',
                         trigger: 'blur'
                     }*/],
                    outCheckQuantity:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    productQuantity:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    checkResult: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    qualityLevel: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    importance: [{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                    signNote: [],
                    itemType:[{
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    }],
                },
                ajaxFlag: false,
                dialogVisible: false, // 弹框是否开启
                lineWidth: 5, // 画笔的线条粗细
                lineColor: "#000000", // 画笔的颜色
                bgColor: "", // 画布的背景颜色
                resultImg: "", // 最终画布生成的base64图片
                isCrop: false, // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
            };
        },
        beforeRouteLeave(to, from, next) {
            if (to.path === "/coverageList") {
                // 设置下一个路由的 meta
                to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
            }
            next();
        },
        watch: {
            'form.productQuantity': function (newData, oldData) {
                if(newData == oldData) {return;}
                if (this.form.qualityLevel == 'C') {
                    switch (newData) {
                        case 20:
                            this.form.mainAc = '1';
                            this.form.mainRe = '2';
                            this.form.secondaryAc = '2';
                            this.form.secondaryRe = '3';
                            break;
                        case 32:
                            this.form.mainAc = '2';
                            this.form.mainRe = '3';
                            this.form.secondaryAc = '3';
                            this.form.secondaryRe = '4';
                            break;
                        case 50:
                            this.form.mainAc = '3';
                            this.form.mainRe = '4';
                            this.form.secondaryAc = '5';
                            this.form.secondaryRe = '6';
                            break;
                        case 80:
                            this.form.mainAc = '5';
                            this.form.mainRe = '6';
                            this.form.secondaryAc = '7';
                            this.form.secondaryRe = '8';
                            break;
                        case 125:
                            this.form.mainAc = '7';
                            this.form.mainRe = '8';
                            this.form.secondaryAc = '10';
                            this.form.secondaryRe = '11';
                            break;
                        case 200:
                            this.form.mainAc = '10';
                            this.form.mainRe = '11';
                            this.form.secondaryAc = '14';
                            this.form.secondaryRe = '15';
                            break;
                        case 315:
                            this.form.mainAc = '14';
                            this.form.mainRe = '15';
                            this.form.secondaryAc = '21';
                            this.form.secondaryRe = '22';
                            break;
                        case 500:
                            this.form.mainAc = '21';
                            this.form.mainRe = '22';
                            this.form.secondaryAc = '21';
                            this.form.secondaryRe = '22';
                            break;
                    }
                } else if (this.form.qualityLevel == 'B') {
                    switch (newData) {
                        case 20:
                            this.form.mainAc = '1';
                            this.form.mainRe = '2';
                            this.form.secondaryAc = '1';
                            this.form.secondaryRe = '2';
                            break;
                        case 32:
                            this.form.mainAc = '1';
                            this.form.mainRe = '2';
                            this.form.secondaryAc = '2';
                            this.form.secondaryRe = '3';
                            break;
                        case 50:
                            this.form.mainAc = '2';
                            this.form.mainRe = '3';
                            this.form.secondaryAc = '3';
                            this.form.secondaryRe = '4';
                            break;
                        case 80:
                            this.form.mainAc = '3';
                            this.form.mainRe = '4';
                            this.form.secondaryAc = '5';
                            this.form.secondaryRe = '6';
                            break;
                        case 125:
                            this.form.mainAc = '5';
                            this.form.mainRe = '6';
                            this.form.secondaryAc = '7';
                            this.form.secondaryRe = '8';
                            break;
                        case 200:
                            this.form.mainAc = '7';
                            this.form.mainRe = '8';
                            this.form.secondaryAc = '10';
                            this.form.secondaryRe = '11';
                            break;
                        case 315:
                            this.form.mainAc = '10';
                            this.form.mainRe = '11';
                            this.form.secondaryAc = '14';
                            this.form.secondaryRe = '15';
                            break;
                        case 500:
                            this.form.mainAc = '14';
                            this.form.mainRe = '15';
                            this.form.secondaryAc = '21';
                            this.form.secondaryRe = '22';
                            break;
                    }
                }
            },
            'form.qualityLevel': function (newData, oldData) {
                if(newData == oldData) {return;}
                console.log(this.form.productQuantity);
                console.log(newData);
                if(this.form.productQuantity) {
                    if (newData == 'C') {
                        console.log(1);
                        switch (this.form.productQuantity) {
                            case 20:
                                this.form.mainAc = '1';
                                this.form.mainRe = '2';
                                this.form.secondaryAc = '2';
                                this.form.secondaryRe = '3';
                                break;
                            case 32:
                                this.form.mainAc = '2';
                                this.form.mainRe = '3';
                                this.form.secondaryAc = '3';
                                this.form.secondaryRe = '4';
                                break;
                            case 50:
                                this.form.mainAc = '3';
                                this.form.mainRe = '4';
                                this.form.secondaryAc = '5';
                                this.form.secondaryRe = '6';
                                break;
                            case 80:
                                this.form.mainAc = '5';
                                this.form.mainRe = '6';
                                this.form.secondaryAc = '7';
                                this.form.secondaryRe = '8';
                                break;
                            case 125:
                                this.form.mainAc = '7';
                                this.form.mainRe = '8';
                                this.form.secondaryAc = '10';
                                this.form.secondaryRe = '11';
                                break;
                            case 200:
                                this.form.mainAc = '10';
                                this.form.mainRe = '11';
                                this.form.secondaryAc = '14';
                                this.form.secondaryRe = '15';
                                break;
                            case 315:
                                this.form.mainAc = '14';
                                this.form.mainRe = '15';
                                this.form.secondaryAc = '21';
                                this.form.secondaryRe = '22';
                                break;
                            case 500:
                                this.form.mainAc = '21';
                                this.form.mainRe = '22';
                                this.form.secondaryAc = '21';
                                this.form.secondaryRe = '22';
                                break;
                        }
                    } else if (newData == 'B') {
                        switch (this.form.productQuantity) {
                            case 20:
                                this.form.mainAc = '1';
                                this.form.mainRe = '2';
                                this.form.secondaryAc = '1';
                                this.form.secondaryRe = '2';
                                break;
                            case 32:
                                this.form.mainAc = '1';
                                this.form.mainRe = '2';
                                this.form.secondaryAc = '2';
                                this.form.secondaryRe = '3';
                                break;
                            case 50:
                                this.form.mainAc = '2';
                                this.form.mainRe = '3';
                                this.form.secondaryAc = '3';
                                this.form.secondaryRe = '4';
                                break;
                            case 80:
                                this.form.mainAc = '3';
                                this.form.mainRe = '4';
                                this.form.secondaryAc = '5';
                                this.form.secondaryRe = '6';
                                break;
                            case 125:
                                this.form.mainAc = '5';
                                this.form.mainRe = '6';
                                this.form.secondaryAc = '7';
                                this.form.secondaryRe = '8';
                                break;
                            case 200:
                                this.form.mainAc = '7';
                                this.form.mainRe = '8';
                                this.form.secondaryAc = '10';
                                this.form.secondaryRe = '11';
                                break;
                            case 315:
                                this.form.mainAc = '10';
                                this.form.mainRe = '11';
                                this.form.secondaryAc = '14';
                                this.form.secondaryRe = '15';
                                break;
                            case 500:
                                this.form.mainAc = '14';
                                this.form.mainRe = '15';
                                this.form.secondaryAc = '21';
                                this.form.secondaryRe = '22';
                                break;
                        }
                    }
                }
            },
        },
        created() {
            let ua = navigator.userAgent.toLowerCase();
            console.log(ua);
            if(ua.indexOf("android") != -1){
                this.phone = true                 //true是安卓 false是ios
            }else if(ua.indexOf("iphone") != -1){
                this.phone = false
            }
            console.log(this.phone);
            let id = this.$route.query.id;
            if (id) {
                this.timeOutId = setTimeout(this.autoSave,15 * 1000);
                this.searchData(id);
            }
            else {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                try{
                    this.timeOutId = setTimeout(this.autoSave,15 * 1000);
                    console.log('query',this.$route.query);
                    // this.oldQuantity= '100';
                    this.form.environment = this.$route.query.env;
                    this.form.vendor = this.$route.query.sampleName;
                    this.form.orderNo = this.$route.query.orderCode;
                    this.form.businPerson = this.$route.query.ourMerchName;
                    this.form.item = this.$route.query.itemJson.itemId;
                    this.form.itemName = this.$route.query.itemJson.itemCode;
                    this.form.mainName = this.$route.query.itemJson.mainCode;
                    if(this.form.mainName){this.showMainItem = true}
                    this.form.custSumItem = this.$route.query.itemJson.number;
                    //this.oldQuantity= this.$route.query.itemJson.number;
                    this.form.mergeNo = this.$route.query.itemJson.orderDetailId;
                    this.form.conIdList = this.$route.query.idList;
                    this.form.checkPerson = this.GLOBAL.user.userReal;
                    this.form.faDate = this.$route.query.faDateString;
                    this.form.importance = this.$route.query.importance;
                    this.form.checkItemTimes = this.$route.query.countResult;
                    this.form.idArray = this.$route.query.idArray;
                    if(!this.form.importance) {
                        this.form.importance = '重要';
                    }
                    loading.close();
                    if(!this.form.environment) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少NS环境信息！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                    if(!this.form.vendor) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少工厂信息！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                    if(!this.form.orderNo) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少合同号！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                    if(!this.form.businPerson) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少业务员！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                    if(!this.form.item || !this.form.itemName|| !this.form.custSumItem) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少货品！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                    console.log(this.form.mergeNo);
                    if(this.form.mergeNo.length<1) {
                        this.$createToast({txt: "加载界面失败！新建界面缺少货品集合信息！", type: "txt"}).show();
                        setTimeout(() => {
                            this.$router.back();
                        }, 2000);
                    }
                }catch (error) {
                    console.log(error);
                    loading.close();
                    this.$createToast({txt: "加载界面失败！", type: "txt"}).show();
                    setTimeout(() => {
                        this.$router.back();
                    }, 2000);

                }
            }
        },
        destroyed(){
            clearTimeout(this.timeOutId);
        },
        methods: {
            clearFile(){
                if(this.showType == true){
                    return;
                }
                else{
                    this.form.fileName = '';
                    this.form.filePath = '';
                    this.fileList = [];
                }
            },
            handleExceedVisio(){
                this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传！`)
            },
            httpRequest(file){
                let fileName = file.file.name;
                this.getBase64(file.file).then(base64Str => {
                    let fileInfo = {};
                    console.log(fileInfo);
                    this.$methods.http("wx/inspection/uploadFile", {
                        'file':base64Str,
                        'fileType':fileName
                    })
                        .then(res => {
                            loading.close();
                            if (res.status == 'success') {
                                console.log(res);
                                this.form.fileName = fileName;
                                this.form.filePath = res.filePath;
                                this.$createToast({txt: "提交成功！", type: "txt"}).show();
                            } else {
                                this.$createToast({txt: "提交失败！", type: "txt"}).show();
                            }
                        });
                });
            },
            beforeAvatarUpload(file) {
                if (file.type != "" || file.type != null || file.type != undefined) {
                    const FileExt = file.name.replace(/.+\./, "").toLowerCase();
                    if(this.fileType.includes(FileExt)){
                        return true;
                    }
                    else {
                        this.$message.error("上传文件格式不正确!");
                        return false;
                    }
                }
            },
            getBase64(file) {
                return new Promise(function(resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    console.log(file);
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        imgResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(imgResult);
                    };
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.form.fileName = '';
                this.form.filePath = '';
            },
            autoSave(){
                this.saveFormData();
                this.timeOutId = setTimeout(this.autoSave,15 * 1000);
            },
            saveFormData() {
                if(this.showType && (this.showType != true || this.showType != 'true')){
                    return;
                }
                if (!this.form.custSumItem) {
                    return;
                }
                if (!this.form.custSumBox) {
                    return;  //itemType
                }
                let formInfo = {};
                for (let key in this.form) {
                    formInfo[key] = this.form[key];
                }
                this.$methods.http("wx/inspection/create", {
                    formInfo: formInfo,
                })
                    .then(res => {
                        if (res.status == 'success') {
                            this.form.id = res.irID;
                        } else {
                        }
                    }).catch((err) => {
                });
            },
            addDomain(){
                this.addDetail.push({
                    itemName: ' ',
                    result:'1',
                    main:' ',
                    sen:' ',
                    mainMarks:' ',
                    senMarks:' '
                });
            },
            deleteDomain(index) {
                this.addDetail.splice(index, 1);
            },
            noSign(){
                console.log(this.form.signChecked);
                if(this.form.signChecked) {
                    let signRule = {
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    };
                    this.rules.signNote.push(signRule);
                }
                else{
                    this.rules.signNote = [];
                }

            },
            upLoadImage(){
                let insId = this.form.id;
                let sampleName = this.$route.query.sampleName;
                let orderCode = this.$route.query.orderCode;
                let ourMerchName  = this.$route.query.ourMerchName;
                let itemCode = this.$route.query.itemCode;
                let itemName = this.form.itemName;
                this.$router.push({path:'imageNext',query: {
                        insId:insId,
                        sampleName:sampleName,
                        orderCode:orderCode,
                        ourMerchName:ourMerchName,
                        itemCode:itemCode,
                        itemName:itemName
                    }
                });
            },
            narrowButton() {
                this.diaWidth = this.diaWidth - 30;
            },
            enlargeButton() {
                this.diaWidth = this.diaWidth + 30;
            },
            goClose() {
                this.pdfDialogVisible = false;
            },
            GetProtocolQueryBase(){//协议预览
                let id = this.form.id;
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$methods.http("wx/inspection/reviewReport", {
                    id: id,
                }).then(res=>{
                    loading.close();
                    let datas = 'data:application/pdf;base64,' + res.pdfBase;
                    this.pdfData = datas;
                    this.pdfSrc = pdf.createLoadingTask({ url: this.pdfData,cMapUrl:'https://ai.nuerabeauty.com:19015/pages/static/cmaps/',cMapPacked:true });
                    for(var key in require.cache) {
                        if(key.indexOf('bcmap') >= 0) {
                            delete require.cache[key];
                        }
                    }
                    this.pdfSrc.promise.then(pdf => {
                        this.numPages = pdf.numPages;
                        this.pdfDialogVisible = true;
                    }).catch(err=>{
                        console.log("pdf加载失败",err);
                    });
                }).catch(() => {loading.close();});
            },
            //预览图片
            GetProtocolImage(){
                let insId = this.form.id;
                let sampleName = this.$route.query.sampleName;
                let orderCode = this.$route.query.orderCode;
                let ourMerchName  = this.$route.query.ourMerchName;
                let itemCode = this.$route.query.itemCode;
                let itemName = this.form.itemName;
                this.$router.push({path:'imageShow',query: {
                        insId:insId,
                        sampleName:sampleName,
                        orderCode:orderCode,
                        ourMerchName:ourMerchName,
                        itemCode:itemCode,
                        itemName:itemName
                    }
                });
            },
            searchData(id) {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$methods.http("wx/inspection/search", {
                    id: id,
                })
                    .then(res => {
                        loading.close();
                        if (res.status == 'success') {
                            res.entity.date = new Date(res.entity.date.replace(/-/g, "/"));
                              if(res.entity.itemType){
                                  res.entity.itemType = JSON.parse(res.entity.itemType)
                              }
                            if(res.entity.exType){
                                res.entity.exType = JSON.parse(res.entity.exType)
                            }
                            this.form = res.entity;
                            //20220715 郭维维添加
                            if(res.entity.addDetail){
                                this.addDetail = JSON.parse(res.entity.addDetail)
                            }
                            if(res.entity.checkboxList){
                                this.checkedId = JSON.parse(res.entity.checkboxList)
                            }
                            // this.oldQuantity = res.entity.custSumItem;
                            this.showType = true;
                            if(this.form.mainName){this.showMainItem = true}
                            if(this.form.signChecked && (this.form.signChecked == true || this.form.signChecked == 'true')) {
                                this.form.signChecked = true;
                            }else{
                                this.form.signChecked = false;
                                console.log(2,this.form.signChecked);
                            }
                        } else {
                            this.$createToast({txt: "查询失败！", type: "txt"}).show();
                        }
                    }).catch(err => {console.log('222',err);loading.close();});
            },
            openSign(){
                this.dialogVisible = true;
            },
            handleReset() {
                this.$refs.esign.reset();
            },
            // 生成签字图
            handleGenerate() {
                this.$refs.esign
                    .generate() // 使用生成器调用把签字的图片转换成为base64图片格式
                    .then((res) => {
                        this.form.signImg = res;
                    })
                    .catch((err) => {
                        this.$message({
                            type: "warning",
                            message: "请签名后再生成签字图片",
                        });
                    });
                setTimeout(() => {
                }, 200);
                this.dialogVisible = false;
            },
            show() {
                this.showType = true;
            },
            submit(form) {
                if(!this.form.custSumItem) {
                    this.$message.error('请填写待检总数量!');
                    return;
                }
                if(!this.form.custSumBox) {
                    this.$message.error('请填写待检总箱数!');
                    return;  //itemType
                }
                let formInfo = {};
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                for (let key in this.form) {
                    formInfo[key] = this.form[key];
                }
                //2022/7/15  郭维维新增
                formInfo['addDetail'] = this.addDetail;
                formInfo['checkboxList'] = this.checkedId;
                this.$methods.http("wx/inspection/create", {
                    formInfo: formInfo,
                })
                    .then(res => {
                        loading.close();
                        if (res.status == 'success') {
                            this.$createToast({txt: "提交成功！", type: "txt"}).show();
                            this.searchData(res.irID);
                        } else {
                            this.$createToast({txt: "提交失败！", type: "txt"}).show();
                        }
                    }).catch((err) => {
                    loading.close();
                });
            },
            edit() {
                this.showType = false;
            },
            uploadMail() {
                if(!this.form.checkItemTimes) {
                    this.$message.error('请先填写验货次数!');
                    return;
                }
                if(!this.form.outCheckQuantity || !this.form.productQuantity ) {
                    this.$message.error('请填写抽检数量!');
                    return;
                }
                /*  if(!this.form.boxPackQuantity || !this.form.outBoxPackQuantity) {
                      this.$message.error('请填写包装数量!');
                      return;
                  }*/
                if(!this.form.itemType) {
                    this.$message.error('请填写产品类别!');
                    return;
                }
                if(!this.form.checkResult) {
                    this.$message.error('请填写验货结果!');
                    return;
                }
                if(!this.form.qualityLevel) {
                    this.$message.error('请选择AQL抽建标准!');
                    return;
                }
                if(!this.form.signImg && !this.form.signChecked || (this.form.signChecked && !this.form.signNote)) {
                    this.$message.error('请厂长签字或勾选无厂长签字并填写备注!');
                    return;
                }
                if(!this.form.date) {
                    this.$message.error('请选择验货时间!');
                    return;
                }
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$methods.http("wx/inspection/sendMail", {
                    id: this.form.id,
                }).then(res=>{
                    loading.close();
                    if (res.status == 'success') {
                        this.$createToast({txt: "邮件发送处理中，请稍后查看结果！", type: "txt"}).show();
                        this.form.status = 1;
                    } else {
                        this.$createToast({txt: "发送失败！", type: "txt"}).show();
                    }
                }).catch(() => {loading.close();});
            },
            review() {
                this.GetProtocolQueryBase();
            },
            reviewImage() {
                this.GetProtocolImage();
            }
        },
        components: {
            pdf,
            CMapReaderFactory,
        }
    };
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/convert.styl';
  .wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    .headerApp {
      font-size: 18px
    }
    .header {
      flex: none;
      height: 5%; //convert(40)
      text-align: center;
      background-size: 100% 100%;
      padding-top: convert(10);
      background: #ffffff
    }
    .content {
      margin-top: convert(3);
      border: 3px solid black;
      margin-left: 2%;
      margin-right: 2%;
      .headerApp2 {
        margin-top: convert(5);
        font-size: 15px;
        text-align: center;
        font-weight: bold;
      }
      .formItem {
        margin-top: convert(2);
      }
      .inputDeep>>>.el-input__inner {
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep2>>>.el-input__inner {
        width: 120px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep3>>>.el-input__inner {
        width: 80px;
        margin-left: -50%;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep4>>>.el-input-group__append {
        color: black;
        font-size: 12px;
        background-color: white;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
      }
      .inputDeep5>>>.el-input__inner {
        width: 90px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep6>>>.el-textarea__inner {
        width: 270px;
        margin-left: 2%;
        margin-right: 2%;
      }
      .inputDeep15>>>.el-input__inner {
        width: 70px;
        margin-left: 0%;

        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep16>>>.el-input__inner {
        width: 60px;
        margin-left: -40%;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
    }
    .content2 {
      margin-top: convert(0);
      border-left: 3px solid black;
      border-right: 3px solid black;
      border-bottom: 3px solid black;
      margin-left: 2%;
      margin-right: 2%;
      .inputDeep7>>>.el-input__inner {
        width: 230px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep8>>>.el-input__inner {
        width: 120px;
        margin-left: 3%;
        margin-top: -5%;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep9>>>.el-input-group__append {
        label-width: 10px;
        width: 20px;
        color: black;
        font-size: 12px;
        background-color: white;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
      }
      .inputDeep10>>>.el-radio__input {
        width: 0px;
        margin-left: -55%;
      }
      .inputDeep11>>>.el-input__inner {
        width: 50px;
        margin-left: 3%;
        margin-top: -5%;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep12>>>.el-input__inner {
        width: 90px;
        margin-left: -15%;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
      }
      .inputDeep13>>>.el-radio__input {
        line-height: 20px;
      }
      .inputDeep14>>>.el-radio__input {
        line-height: 20px;
        // margin-left: 150%;
      }
    }
  }
  .handBtn button {
    font-size: 15px;
  }
  .handBtn {
    text-align:center;
  }
  .delBtn {
    position: absolute;
    margin-left :10%;
    left: -7px;
    color: #666;
  }
  .subBtn {
    margin-left :60%;
    background: #008ef6;
    color: #fff;
  }
  .handCenter {
    border: 3px dashed #e9e9e9;
    flex: 14;
    overflow: hidden;
    box-sizing: border-box;
  }
  .wrapper {
    margin: 0px 0;
    overflow: hidden;
    display: flex;
    align-content: center;
    flex-direction: row;
    justify-content: center;
    font-size: 28px;
  }
</style>
