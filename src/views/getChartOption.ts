import "echarts-wordcloud";

export function exportMultipleRingOption(seriesdata, name) {
  const color = [];
  const copycolor = ["#5694F9", "#45A6F3", "#7FACF9", "#B4DBFA"];
  let colornum = 0;
  let legendData = [];
  let bignum = 0;

  const placeHolderStyle = {
    normal: {
      color: "rgba(0,0,0,0)",
      label: { show: false },
      labelLine: { show: false },
      borderWidth: 0,
    },
    emphasis: {
      color: "rgba(0,0,0,0)",
    },
  };
  function getData(data) {
    let sortData = data.sort((a, b) => {
      return b.value - a.value;
    });
    bignum = sortData[0].value;
    let res = [];

    for (let i = 0, l = sortData.length; i < l; i++) {
      if (sortData[i].name === "本周关闭问题" || sortData[i].name === "本周问题关闭") {
        color.push("#FD983F");
      } else {
        color.push(copycolor[colornum]);
        colornum++;
      }
      legendData.push(sortData[i].name);
      res.push({
        type: "pie",
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ["30%", "50%"],
        radius: [(5 - i) * 20, (5 - i) * 20], //radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        itemStyle: {
          normal: {
            label: { show: false },
            labelLine: { show: false },
            borderWidth: 10,
            borderColor: color[i],
            shadowColor: "rgba(40, 40, 40, 0.5)",
          },
        },
        data: [
          {
            value: sortData[i].value,
            name: sortData[i].name,
          },
          {
            value: bignum - sortData[i].value,
            name: "invisible",
            itemStyle: placeHolderStyle,
          },
        ],
      });
    }
    return res;
  }
  // eslint-disable-next-line no-unused-vars
  let d = getData(seriesdata);
  const multipleRingOption = {
    color,
    title: {
      text: name,
      right: 95,
      top: 5,
      textStyle: {
        color: "#46515C",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "数量 <br/>{b} : {c} ({d}%)",
    },

    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "45%"],
        data: seriesdata,
        roseType: "radius",
        // label: {
        //   color: '#ddd'
        // },
        labelLine: {
          lineStyle: {
            color: ["#5694F9", "#45A6F3", "#7FACF9"],
          },
        },
        itemStyle: {
          normal: {
            color: function(params) {
              var colorList = ["#5694F9", "#FF6B6B", "#7FACF9", "#B4DBFA", "#FD983F"];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        // eslint-disable-next-line no-unused-vars
        animationDelay: function(idx) {
          return Math.random() * 200;
        },
      },
    ],
  };
  return multipleRingOption;
}

export function exportRosePieOption(data, name) {
  function getlegend(val) {
    let arr = val.map(item => item.name);
  }
  let l = name == "深化设计" ? "30%" : "26%";
  let option = {
    color: ["#5694F9", "#45A6F3", "#7FACF9", "#B4DBFA", "#B0CAFB"],
    title: {
      text: name,
      left: l,
      top: 120,
      zlevel: 1,
      textStyle: {
        color: "#46515C",
      },
    },
    tooltip: {
      trigger: "item",
      transitionDuration: 0,
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      top: 50,
      itemGap: 20,
      right: 30,
      data: getlegend(data),
      formatter: function(name) {
        let obj = data.find(item => {
          return item.name === name;
        });
        return `${obj.name} ${obj.value}`;
      },
    },
    series: [
      {
        name: "记录统计",
        zlevel: 2,
        label: {
          show: false,
          position: "center",
          formatter: arg => {
            return `${arg.name}   ${arg.value}`;
          },
          width: 130,
          height: 30,
          rich: {},
          backgroundColor: "#5694F9",
          borderRadius: 4,
          lineHeight: 34,
          shadowColor: "#d8d8d8",
          shadowBlur: 5,
          color: "#fff",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
        type: "pie",
        radius: [70, 100],
        center: ["40%", "50%"],
        roseType: "area",
        data: data,
      },
    ],
  };
  return option;
}

export function exportLineOption(data) {
  const color = [];
  const copycolor = ["#5694F9", "#1798FF", "#7FACF9"];
  let colornum = 0;
  let obj = {
    ["value1"]: [],
    ["value2"]: [],
  };
  let lengend = [];
  let xdata = [];
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key === "name") {
        xdata.push(item[key]);
      } else {
        obj[key].push(item[key]);
        !lengend.includes(key) && lengend.push(key);
      }
    });
  });
  function manageSeriesData(val) {
    let arr = [];
    for (const key in val) {
      if (key === "value1") {
        color.push("#FD983F");
        arr.push({
          name: "项目金额",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
              },
            },
          },
          areaStyle: {
            opacity: 0.3,
          },
          data: val[key],
        });
      } else {
        color.push(copycolor[colornum]);
        arr.push({
          name: "项目数量",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
              },
            },
          },
          data: val[key],
        });
        colornum++;
      }
    }
    return arr;
  }
  let series = manageSeriesData(obj);
  let option = {
    color,
    tooltip: {
      trigger: "axis",
      transitionDuration: 0,
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: lengend,
    },
    grid: {
      top: 30,
      left: "4%",
      right: "3%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xdata,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#002661",
          },
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],
    series,
  };
  return option;
}
export function exportLineOptiontwo(data) {
  const color = [];
  const copycolor = ["#5694F9", "#1798FF", "#7FACF9"];
  let colornum = 0;
  let obj = {
    ["value1"]: [],
    ["value2"]: [],
    ["value3"]: [],
  };
  let lengend = [];
  let xdata = [];
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key === "name") {
        xdata.push(item[key]);
      } else {
        obj[key].push(item[key]);
        !lengend.includes(key) && lengend.push(key);
      }
    });
  });
  function manageSeriesData(val) {
    let arr = [];
    for (const key in val) {
      if (key === "value1") {
        color.push("#FD983F");
        arr.push({
          name: "库内供方",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
              },
            },
          },
          areaStyle: {
            opacity: 0.3,
          },
          data: val[key],
        });
      } else if (key === "value2") {
        color.push("#F56C6C");
        arr.push({
          name: "可用供方",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
              },
            },
          },
          areaStyle: {
            opacity: 0.3,
          },
          data: val[key],
        });
      } else {
        color.push(copycolor[colornum]);
        arr.push({
          name: "合作供方",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
              },
            },
          },
          data: val[key],
        });
        colornum++;
      }
    }
    return arr;
  }
  let series = manageSeriesData(obj);
  let option = {
    color,
    tooltip: {
      trigger: "axis",
      transitionDuration: 0,
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: lengend,
    },
    grid: {
      top: 30,
      left: "4%",
      right: "3%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xdata,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#002661",
          },
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],
    series,
  };
  return option;
}
export function exportXBarOption(data) {
  let seriesdata = [];
  let xdata = [];
  let otherdata = 0;
  let isother = false;
  data.data.forEach(item => {
    if (item.cooperName) {
      xdata.push(item.cooperName);
      seriesdata.push(item.cooperCount);
    } else {
      isother = true;
      otherdata += item.cooperCount;
    }
  });
  //处理item.cooperName为null的时候
  if (isother) {
    seriesdata.push(otherdata);
    xdata.push("其他");
  }
  let option = {
    color: ["#5694F9", "#45A6F3", "#7FACF9", "#B4DBFA", "#B0CAFB"],
    tooltip: {
      trigger: "axis",
      transitionDuration: 0,
    },
    xAxis: {
      type: "category",
      data: xdata,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#002661",
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    grid: {
      top: "20",
      left: "3%",
      right: "2%",
      bottom: "20",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        data: seriesdata,
        barWidth: "23",
        type: "bar",
      },
    ],
  };
  return option;
}

export function exportYBarOption(data) {
  // let seriesdata = []
  // let xdata = []
  console.log(data);
  // data.forEach(item => {
  //   xdata.push(item.name)
  //   seriesdata.push(item.value)
  // })
  // console.log(xdata);
  let option = {
    color: ["#5694F9", "#45A6F3", "#7FACF9", "#B4DBFA", "#B0CAFB"],
    tooltip: {
      trigger: "axis",
      transitionDuration: 0,
    },
    xAxis: {
      type: "category",
      data: data.name,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    grid: {
      top: "20",
      left: "3%",
      right: "3%",
      bottom: "20",
      containLabel: true,
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#002661",
        },
      },
    },
    series: [
      {
        data: data.value,
        type: "bar",
        barWidth: "28px",
      },
    ],
  };
  return option;
}

export function exportTextCloudOption(value, colorarr) {
  let option = {
    tooltip: {
      trigger: "item",
      transitionDuration: 0,
    },
    series: [
      {
        type: "wordCloud",
        gridSize: 15,
        sizeRange: [14, 32],
        width: "100%",
        height: "100%",
        rotationRange: [0, 0],
        shape: "pentagon",
        textStyle: {
          normal: {
            fontFamily: "sans-serif",
            color: function(n) {
              return `rgba(${colorarr.join(",")}, ${1 - n.dataIndex * 0.05})`; //字体的随机颜色
            },
          },
          emphasis: {
            //鼠标移入的特效样式
            shadowBlur: 5,
            shadowColor: "#666",
          },
        },
        drawOutOfBound: false,
        data: value,
      },
    ],
  };
  return option;
}

export function exportChunkChartOption(data) {
  let d = data.data[0];
  let seriesdata = [],
    arr = [],
    sarr = [],
    ydata = data.yData,
    xdata = data.xData;
  for (const key in d) {
    sarr = [];
    for (let j = 0, k = ydata.length; j < k; j++) {
      if (key.indexOf(ydata[j]) !== -1) {
        sarr[0] = j;
        break;
      }
    }
    for (let i = 0, l = xdata.length; i < l; i++) {
      if (key.indexOf(xdata[i]) !== -1) {
        sarr[1] = i;
        break;
      }
    }
    sarr.push(d[key]);
    arr.push(sarr);
  }
  let narr = arr.map(function(item) {
    return [item[1], item[0], item[2] || "-"];
  });
  let option = {
    tooltip: {
      position: "top",
    },
    animation: false,
    grid: {
      left: "10%",
      right: "2%",
      top: "10%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: xdata,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: ydata,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 5000,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 0,
      textStyle: {
        color: "#000",
      },
    },
    series: [
      {
        name: "安全问题统计",
        type: "heatmap",
        data: narr,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return option;
}
export const problomList = [
  {
    id: "1",
    projectName: "中建安装集团有限公司",
    landGettype: "约谈",
    landGetjibie: "大区",
    landGetpro: "昆仑域 标段一",
    heightLimite: "2020-08-08",
  },
  {
    id: "2",
    projectName: "中建一局",
    landGettype: "通报",
    landGetjibie: "城市",
    landGetpro: "昆仑域 标段二",
    heightLimite: "2020-08-08",
  },
  {
    id: "3",
    projectName: "河北建工集团",
    landGettype: "罚款",
    landGetjibie: "项目",
    landGetpro: "首开·华润城 标段一",
    heightLimite: "2020-08-08",
  },
  {
    id: "3",
    projectName: "中铁二局",
    landGettype: "降级",
    landGetjibie: "大区",
    landGetpro: "首开·华润城 标段二",
    heightLimite: "2020-08-08",
  },
  {
    id: "3",
    projectName: "南通建工",
    landGettype: "问题",
    landGetjibie: "大区",
    landGetpro: "昆仑域 标段一",
    heightLimite: "2020-08-08",
  },
];
