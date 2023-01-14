<template>
	<view class="content" :style="{'background-image':'url('+$imgUrl+lang+'/home/bg.jpg)'}">
		<view class="pg-main">
			<!-- <img lazy-load="true" class="logo-type" src='/static/logo-type.png' /> -->
			<!-- <img lazy-load="true" class="logo" src='/static/logo.png' /> -->
			<image lazy-load="true" class="logo-type" src="/static/logo-type.png" mode="widthFix"></image>
			<image lazy-load="true" class="logo" src="/static/logos.png" mode="widthFix"></image>

			<!-- <img :src='list["pageBg"][$store.state.lang]["bg"]' class="pg-img" alt=""> -->
			<view class="site-view-box">
				<image lazy-load="true" class="site-view" :src='$imgUrl+lang+list.siteView' mode="widthFix"
					:alt='list.title.lang'>
				</image>
				<navigator class="nav-btn" url="/pages/tablist/index?id=emba">
					<image lazy-load="true" class="nav-btn-img" :src='$imgUrl+lang+"/home/btn.png"' mode="widthFix"
						:alt='list.title.lang'></image>
				</navigator>
			</view>
			<image lazy-load="true" class="footer-block" :src='$imgUrl+lang+"/home/emba.png"' mode="widthFix"
				:alt='list.title.lang'>
			</image>
			<!-- 悬浮快捷键 -->
			<!-- <drag-button :isDock="true" :existTabBar="true" /> -->
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	import {
		Home
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";
	export default {
		data() {
			return {
				list: Home,
				lang: this.$store.state.lang
			}
		},
		components: {
			dragButton
		},
		onLoad(option) {
			const that = this;
			// let lang = option.lg || "cn";
			// this.setLang(lang)
			that.$store.dispatch('getLang');
		},
		onReady() {
			// console.log("isWeixin：", this.$store.state.isWeixin)

			var lang = this.$store.state.lang;
			this.lang = lang;
			//console.log("lang lang：", lang, this.lang)
			//#ifdef H5
			mdl.wxShare({
				lang
			});
			//#endif
		},
		methods: {
			getApp(type) {
				console.log(type)
			},
			setLang(val) {
				var that = this;
				uni.setStorage({
					key: 'DBA-Lang',
					data: val,
					success: function() {
						let lg = val || "cn";
						that.$store.state.lang = lg;
						that.$store.dispatch('getLang');
						that.lang = lg;
						uni.setNavigationBarTitle({
							title: that.list['title'][that.$store.state.lang]
						})
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
	/*每个页面公共css */
	page,
	body {
		min-height: 100%;
		height: inherit;
	}

	.content {
		height: 100%;
		background-repeat: no-repeat;
		background-position: 50% top;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pg-main {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.logo-type,
	.logo {
		position: absolute;
		top: 40upx;
		right: 60upx;
		width: 180upx;
		height: 150upx;
	}

	.logo {
		width: 280upx;
		height: 110upx;
	}

	.logo-type {
		top: 40upx;
		right: auto;
		left: 60upx;
	}

	.site-view-box {
		position: absolute;
		top: 20%;
		width: 80%;
		padding: 0 10%;
		z-index: 10;
	}

	.site-view {
		width: 100%;
	}

	.nav-box {
		width: 500upx;
		position: absolute;
		top: 45%;
		left: 8%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.nav-btn {
		margin: 20upx 0 0;
		width: 75%;
	}

	.nav-btn-img {
		display: inline-block;
		width: 100%;

	}

	.pg-img {
		width: 100%;
		display: block;
	}

	.footer-block {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
	}
</style>
