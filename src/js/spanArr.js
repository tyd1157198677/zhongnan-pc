function getSpanArr(data, val) {
  //页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
  let spanArr = [];
  let pos = 0;
  //遍历数据
  data.forEach((item, index) => {
    //判断是否是第一项
    if (index === 0) {
      spanArr.push(1);
      pos = 0;
    } else {
      //不是第一项时，就根据标识去存储
      if (data[index][val] === data[index - 1][val]) {
        // 查找到符合条件的数据时每次要把之前存储的数据+1
        spanArr[pos] += 1;
        spanArr.push(0);
      } else {
        // 没有符合的数据时，要记住当前的index
        //this.spanArr = this.publicJs.getSpanArr(this.Recordstandard, 'cateName')
        // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // 页面列表上 表格合并行 -> 第几列(从0开始)
        // 需要合并多个单元格时 依次增加判断条件即可
        //     if (columnIndex === 0) {
        //       // 二维数组存储的数据 取出
        //       let _row = this.spanArr[rowIndex]
        //       let _col = _row > 0 ? 1 : 0
        //       return {
        //         rowspan: _row,
        //         colspan: _col
        //       }
        //     }
        //   },
        spanArr.push(1);
        pos = index;
      }
    }
  });
  return spanArr;
}
export default {
  getSpanArr,
};
