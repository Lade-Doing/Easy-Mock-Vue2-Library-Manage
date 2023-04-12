<template>
    <div class="home">
        <h1>欢迎学习小豆子学堂Vue实战课堂</h1>
        <!-- 为ECharts准备一个具体大小（宽和高）的DOM，用于显示图标--- -->
        <div ref="chartDemodiv" style="width:100%;height: 400px"></div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            chartDemo: null,
        };
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            console.log(this)
            //基于准备好的DOM，初始化Echarts实例
            this.chartDemo=this.$echarts.init(this.$refs.chartDemodiv)
            this.chartDemo.setOption({
                //指定图标的配置项和数据
            title:{
                text: "各种类型图书库存数量",//为图表配置主题
                left:"center",//图表标题居中对齐
                textStyle:{
                    color: "red" //图表标题文字颜色为红色
                }
            },
            tooltip:{
                //配置提示信息
                trigger: "axis",  //当trigger为'item'时，鼠标只有移动到对应数据点才会显示
                                  //该点的数据，为‘axis’时，鼠标移动到该列的范围区域都会显示对应
                                  //的数据点
                axisPointer:{
                    type:"shadow" //指示器类型，line表示直线型，shadow表示阴影型，none表示无。
                                  //cross表示十字准星型
                }
            },
            legend:{
                //配置图列
                top:30,//设置图列与顶部间的距离，外面不要单引号，不加单位怕px
                data:[
                    {
                        name: "库存数量",//name名称必须与series下的name属性保持一致才有效
                        //强制设置图列图标为圆
                        icon: "circle",
                        //设置图列文本的效果
                        textStyle:{
                            color: "#545c64",
                            fontFamily:"微软雅黑",
                            fontSize:16
                        }
                    }
                ]
            },
            xAxis:{
                //x轴
                type: "category",//type为坐标类型，category为维度轴，value为度量轴
                data:["编程类","射击类","前端类","移动开发类"]//data维度数据，只有在维度轴才有效

            },
            yAxis:{
                //y轴
                type: "value",
                min:500,//刻度最小值
                interval:50 //设置刻度间隔值
            },
            series:[
                {
                    name:"库存数量",
                    data:[620,932,901,934],//先固定数据
                    type: "line" //图表类型
                }
            ]
            })
        }
    }
}
</script>
<style scoped>
    h1{
        text-align: center;
    }
</style>
