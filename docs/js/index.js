/*
 * @Author: yangxiooping
 * @Date:   2017-09-15 10:20:39
 * @Last Modified by:   yangxiooping
 * @Last Modified time: 2017-09-15 15:27:15
 */
;
(function() {
    $(document).ready(function() {
        $("#submit").click(function() {
            //贷款金额
            var number = $("#number").val();
            //贷款类型
            var selectTypeVal = $("#type").val();
            //贷款利率
            var rate = $("#rate").val();
            //还款周期
            var Cycle = $("#cycle").val();
            //贷款年利率
            var yearRate;
            //贷款利息
            var interest;
            //还款总额
            var total;

            if (!number) {
                $("#content").html('<b style="color: red;">请输入贷款金额</b>');
                return;
            }
            if (!rate) {
                $("#content").html('<b style="color: red;">请输入贷款利率</b>');
                return;
            }

            switch (selectTypeVal) {
                case "1":
                    { //月固定利率
                        yearRate = Math.round((rate * 12) * 100) / 100;
                        interest = Math.round((rate * Cycle * number * 0.01) * 100) / 100;
                        total = Number(number) + interest;
                        var html = "贷款金额: <b>" + number + "</b>" + "&nbsp;&nbsp;&nbsp;贷款利息: <b>" + interest + "</b>" +
                            "&nbsp;&nbsp;&nbsp;贷款年利率: <b>" + yearRate + "%</b>" + "&nbsp;&nbsp;&nbsp;还款总额: <b>" + total + "</b>";

                        var perMonth = total / Cycle;
                        perMonth = Math.round(perMonth * 100) / 100;

                        var lastMonth = Math.round((total - perMonth * (Cycle - 1)) * 100) / 100;

                        //每月利息
                        var perMonthInterest = rate * number * 0.01;
                        perMonthInterest = Math.round(perMonthInterest * 100) / 100;


                        for (var i = 1; i <= Cycle; i++) {
                            var t = i !== Cycle ? perMonth : lastMonth;
                            //每月本金
                            var perMonthNumber = t - perMonthInterest;
                            perMonthNumber = Math.round(perMonthNumber * 100) / 100;
                            html += "<br/><br/>第" + i + "个月还款总额: <b>" + t + "</b>&nbsp;&nbsp;&nbsp;" + "还款本金: <b>" + perMonthNumber + "</b>&nbsp;&nbsp;&nbsp;" + "还款利息: <b>" + perMonthInterest + "</b>";
                        }
                        $("#content").html(html);
                        break;
                    }
                case "2":
                    {
                    //日利率
                        var temp = 0;
                        var b = rate*30*0.01;
                        var d = 12;
                        for (var i = 0; i < d; i++) {
                            temp += Math.pow((1 + b), i);
                        }
                        var c = number / temp;

                        console.log(Math.round((c + number * b)*100)/100); // 输出每月应还金额
                        console.log(Math.round(((c + number * b) * d)*100)/100); // 输出总还款金额
                        console.log(Math.round(((c + number * b) * d - number)*100)/100); // 输出一共还款利息
                        break;
                    }
            }
        });
    });
})();