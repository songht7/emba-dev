<template>
	<view :class="['content','lang-'+lang]">
		<view class="pg-main" :class="[]">
			<view :class="['uni-tab-bar']">
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="ontabchange">
					<swiper-item v-for="(lst,index1) in contList" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
							<view class="tab-img-list">
								<block v-if="lst['lslength']" v-for="index of lst.lslength" :key="index">
									<image lazy-load="true" class="tab-dtl-img"
										@click="linkto(lst['picLink']['i'+index])"
										:src='$imgUrl+lang+"/apply/"+"/ls_"+index+".jpg"' mode="widthFix">
									</image>
									<!-- 		<view class="">
										{{$imgUrl+lang+"/page/p"+lst["id"]+"/ls_"+index+".jpg"}}
									</view> -->
								</block>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		Apply
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";
	import container from '../../components/container/index.vue'
	import LsSwiper from '../../components/ls-swiper/index.vue'

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
				muteBtn: true
				/*doctor end*/
			}
		},
		components: {
			dragButton,
			container,
			LsSwiper,
		},
		computed: {},
		onLoad(option) {
			const that = this;
			that.$store.dispatch('getLang');

			let pageis = option.id || "apply";
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
					case 'apply':
						uni.setNavigationBarTitle({
							title: Apply['title'][_lg]
						})
						this.contList = Apply['contList'][_lg];
						break;
					default:
						uni.redirectTo({
							url: '/pages/index/index',
						})
						break;
				}
			},
			linkto(obj) {
				var that = this;
				if (obj) {
					// console.log(obj["link"][index])
					if (obj.linkType && obj.linkType == "outside") {
						window.open(obj["link"])
					} else {
						uni.navigateTo({
							url: `${obj["link"]}`
						})
					}
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
		background: #f1f1f1;
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

	.page-footer-btn {
		background: #efefef;
		padding: 30upx 0;
		display: flex;
		justify-content: center;
	}

	.nav-btn {
		width: 60%;
	}

	.nav-btn-img {
		width: 100%;
	}

	.tips {
		padding: 10upx 40upx;
	}
</style>
