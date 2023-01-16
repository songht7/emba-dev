<template>
	<view :class="['content','lang-'+lang]">
		<view class="pg-main" :class="[]">
			<view :class="['uni-tab-bar']">
				<view :class="['tab-box']">
					<!-- 头部菜单按钮 -->
					<scroll-view id="tab-bar" style="width: 90%;" class="uni-swiper-tab" :scroll-x="true"
						:show-scrollbar="false" :scroll-into-view="scrollInto">
						<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="`tb-${tab.id}`"
							:data-current="index" @click="ontabtap">
							<text class="uni-tab-item-title title-block"
								:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
						</view>
					</scroll-view>
				</view>
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="ontabchange">
					<swiper-item v-for="(lst,index1) in contList" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
							<view :class="['tab-img-list',applyBtnFixed?'pb-100':'']">
								<block v-if="lst['lslength']" v-for="index of lst.lslength" :key="index">
									<image class="tab-dtl-img"
										:src='$imgUrl+lang+"/page/p"+lst["id"]+"/ls_"+index+".jpg"' mode="widthFix">
									</image>
									<!-- 		<view class="">
										{{$imgUrl+lang+"/page/p"+lst["id"]+"/ls_"+index+".jpg"}}
									</view> -->
								</block>
								<block v-if="lst.lsSwiper&&lst.lsSwiper.length">
									<!-- 滑块 -->
									<view class="" v-for="(item,kk) in lst.lsSwiper" :key="kk">
										<!-- {{$imgUrl+lang+"/page/p"+lst["id"]+"/"+item.img}} -->
										<container :titleImg='$imgUrl+lang+"/page/p"+lst["id"]+"/"+item.img'>
											<!-- {{lst["lsSwiperList"][kk][0]}} -->
											<ls-swiper :list='lst["lsSwiperList"][kk]' :imgUrl="$imgUrl" imgKey="imgUrl"
												imgWidth="98%" :previousMargin="previousMargin" :nextMargin="nextMargin"
												:height="height" :imgRadius="imgRadius" />
										</container>
									</view>
								</block>
								<block v-if="lst.tips">
									<view class="tips">
										<image class="tab-dtl-img" :src='$imgUrl+lang+"/page/p"+lst["id"]+"/"+lst.tips'
											mode="widthFix">
										</image>
									</view>
								</block>

								<apply-link :applyBtnFixed="applyBtnFixed"></apply-link>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<!-- <apply-link></apply-link> -->
	</view>
</template>

<script>
	import {
		Emba
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";
	import container from '../../components/container/index.vue'
	import LsSwiper from '../../components/ls-swiper/index.vue'
	import ApplyLink from '../../components/apply-link.vue'

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		data() {
			return {
				lang: this.$store.state.lang,
				pageis: "",
				list: [],
				tabBars: [],
				contList: [],
				cacheTab: [],
				tabIndex: 0,
				scrollInto: "",
				scrollLeft: 0,
				isClickChange: false,
				showTips: false,
				navigateFlag: false,
				pulling: false,
				/*doctor*/
				previousMargin: 30,
				nextMargin: 100,
				height: 200,
				imgRadius: 5,
				base_lsit: [],
				autoplay: true,
				loop: true,
				muteBtn: true,
				applyBtnFixed: true //了解如何申请按钮是否悬浮置地
				/*doctor end*/
			}
		},
		components: {
			dragButton,
			container,
			LsSwiper,
			ApplyLink
		},
		computed: {},
		onLoad(option) {
			const that = this;
			that.$store.dispatch('getLang');

			let pageis = option.id || "";
			this.pageis = pageis;
			this.getData();

			// let lang = option.lg || "cn";
			// this.setLang(lang)
		},
		onReady() {
			var lang = this.$store.state.lang;
			this.lang = lang;
			//#ifdef H5
			if (this.$store.state.isWeixin) {
				//location.origin, //window.location.href, //"http://emlyon.meetji.com",
				var share_url = window.location.href,
					title = "法国里昂商学院",
					dec = "全球工商管理博士项目",
					imgUrl = "http://emba.meetji.com/static/logo.png";
				mdl.wxShare(share_url, title, dec, imgUrl);
			}
			//#endif
		},
		methods: {
			getData() {
				var _lg = this.$store.state.lang
				switch (this.pageis) {
					case 'emba':
						uni.setNavigationBarTitle({
							title: Emba['title'][_lg]
						})
						this.tabBars = Emba['tabBars'][_lg];
						this.contList = Emba['contList'][_lg];
						break;
					default:
						uni.redirectTo({
							url: '/pages/index/index',
						})
						break;
				}
			},
			linkto(obj, index) {
				var that = this;
				if (obj.link) {
					// console.log(obj["link"][index])
					uni.navigateTo({
						url: `${obj["link"][index]}${that.$store.state.lang}`
					})
				}
			},
			ontabtap(e) {
				// console.log(e)
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				// console.log("ontabchange:", e)
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				// console.log(this.tabIndex, index)
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = `tb-${this.tabBars[index].id}`;
			},
			loadMore(e) {
				var that = this;
			},
			setLang(val) {
				var that = this;
				uni.setStorage({
					key: 'DBA-Lang',
					data: val,
					success: function() {
						let lg = val || "cn";
						that.$store.state.lang = lg;
						that.lang = lg;
						that.$store.dispatch('getLang');
						that.getData();
					},
					fail() {
						// that.$store.state.lang = "cn";
					}
				});
			}
		}
	}
</script>

<style scoped>
	@import "/common/tab.css";

	.content {
		display: flex;
		/* flex-direction: column;
		align-items: center;
		justify-content: center; */
		min-height: 100%;
		background: #efefef;
	}

	.pg-main {
		width: 100%;
		position: relative;
		/* padding-top: 50upx; */
	}

	.doctor-main {
		background: url(http://emlyon.meetji.com/image/cn/doctor/bg.jpg) no-repeat 50% bottom;
		background-size: cover;
	}

	.lang-box {
		top: auto;
		right: auto;
		left: 10%;
		bottom: 30%;
		height: auto;
	}

	.video-box {
		width: 100%;
		padding: 20upx 0;
		background: url(../../static/bg.jpg) repeat-y 50% 50%;
		background-size: contain;
	}

	.myVideo {
		width: 80%;
		margin: 0 10%;
	}

	.tab-img-list.pb-100 {
		padding-bottom: 100upx;
	}

	.tips {
		padding: 10upx 40upx;
	}
</style>
