<template>
	<view :class="['page-footer-btn',applyBtnFixed?'apply-fixed':'']">
		<navigator class="nav-btn" url="/pages/apply/index">
			<image lazy-load="true" class="nav-btn-img" :src='$imgUrl+lang+"/page/btn.png"' mode="widthFix">
			</image>
		</navigator>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				lang: this.$store.state.lang
			};
		},
		props: {
			applyBtnFixed: {
				type: Boolean,
				default: true
			},
		},
		onShow() {},
		methods: {

		},
		computed: {}
	}
</script>


<style>
	.page-footer-btn {
		background: #efefef;
		padding: 30upx 0;
		display: flex;
		justify-content: center;
	}

	.page-footer-btn.apply-fixed {
		position: fixed;
		bottom: -30upx;
		z-index: 20;
		width: 100%;
		background: none;
	}

	.nav-btn {
		width: 60%;
	}

	.nav-btn-img {
		width: 100%;
	}
</style>
