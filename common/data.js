const Home = {
	'domain': 'https://emba.meetji.com',
	"title": {
		"cn": "法国里昂商学院",
		"en": "Global DBA (Asia Track)",
	},
	"siteView": "/home/site-view.png"
};
const Emba = {
	"id": "emba",
	"title": {
		"cn": "北邮里昂EMBA招生简章",
		"en": "北邮里昂EMBA招生简章",
	},
	"tabBars": {
		"cn": [{
				"id": 1,
				"name": "项目纵览"
			}, {
				"id": 2,
				"name": "研学体系"
			},
			{
				"id": 3,
				"name": "智创学校"
			},
			{
				"id": 4,
				"name": "智慧课程"
			},
			{
				"id": 5,
				"name": "智士教授"
			},
			{
				"id": 6,
				"name": "智融平台"
			},
			{
				"id": 7,
				"name": "智享活动"
			},
			{
				"id": 8,
				"name": "智育学生"
			}
		]
	},
	"contList": {
		"cn": [{
				"id": 1,
				"title": "项目纵览",
				"lslength": 8 //列表长度（有多少张图）
			},
			{
				"id": 2,
				"title": "研学体系",
				"lslength": 6
			},
			{
				"id": 3,
				"title": "智创学校",
				"lslength": 8
			},
			{
				"id": 4,
				"title": "智慧课程",
				"lslength": 4
			},
			{
				"id": 5,
				"title": "智士教授",
				"lslength": 2,
				//container: 滑块
				"tips": "tips.png",
				"lsSwiper": [{
					title: "里昂教授",
					img: "title_liang.png"
				}, {
					title: "北邮教授",
					img: "title_beiyou.png"
				}],
				"lsSwiperList": [
					//里昂
					[{
						id: "la1",
						type: "liang",
						name: "孙立坚",
						imgUrl: "/page/p5/liang/la_1.png"
					}, {
						id: "la2",
						type: "liang",
						name: "陆定光",
						imgUrl: "/page/p5/liang/la_2.png"
					}, {
						id: "la3",
						type: "liang",
						name: "Rhoda Davidson",
						imgUrl: "/page/p5/liang/la_3.png"
					}, {
						id: "la4",
						type: "liang",
						name: "龚业明",
						imgUrl: "/page/p5/liang/la_4.png"
					}, {
						id: "la5",
						type: "liang",
						name: "王 华",
						imgUrl: "/page/p5/liang/la_5.png"
					}],
					//北邮
					[{
						id: "by1",
						type: "beiyou",
						name: "吕廷杰",
						imgUrl: "/page/p5/beiyou/by_1.png"
					}, {
						id: "by2",
						type: "beiyou",
						name: "何瑛",
						imgUrl: "/page/p5/beiyou/by_2.png"
					}, {
						id: "by3",
						type: "beiyou",
						name: "杨学成",
						imgUrl: "/page/p5/beiyou/by_3.png"
					}, {
						id: "by4",
						type: "beiyou",
						name: "刘克选",
						imgUrl: "/page/p5/beiyou/by_4.png"
					}, {
						id: "by5",
						type: "beiyou",
						name: "张永泽",
						imgUrl: "/page/p5/beiyou/by_5.png"
					}, {
						id: "by6",
						type: "beiyou",
						name: "赵玉平",
						imgUrl: "/page/p5/beiyou/by_6.png"
					}]
				]
			},
			{
				"id": 6,
				"title": "智融平台",
				"lslength": 4
			},
			{
				"id": 7,
				"title": "智享活动",
				"lslength": 2
			},
			{
				"id": 8,
				"title": "智育学生",
				"lslength": 4
			}
		]
	},
};

const Apply = {
	//申请条件
	"id": "apply",
	"title": {
		"cn": "申请条件",
		"en": "Application Conditions",
	},
	"contList": {
		"cn": [{
			"id": 1,
			"title": "申请条件",
			"lslength": 14, //列表长度（有多少张图）
			"picLink": {
				"i1": {
					"link": "/"
				},
				"i6": {
					"linkType": "outside", //链接类型：outside外部网站，默认本站内
					"link": "https://em-lyon.force.com/Student"
				}
			}
		}]
	},
};

module.exports = {
	Home, //首页
	Emba, //关于学院
	Apply //申请条件
};

// export default {
// 	Data
// }
