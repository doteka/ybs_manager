// 2020-12-15일 백업 / 무한 루프때문에 정상적인 홈페이지가 안됨
function next_EVENT() {
    var check_Year = h_date.getFullYear();
    var check_Month = h_date.getMonth() + 1;
    var check_Date = h_date.getDate();
    var Date;
    var link_Today = "";
    var check_Today = "";
    var toDay = "20201213";
    var event_NM;
    var event_Date;
    var cnt = 0;

    if(check_Month < 10)
        toDay = String(check_Year) + "0" + String(check_Month);
    else
        toDay = String(check_Year) + String(check_Month);

    if(check_Date < 10)
        toDay = toDay + "0" + String(check_Date);
    else
        toDay = toDay + String(check_Date);

    console.log("[Debug]" + toDay);

    while(cnt == 0) {
        var link_date;

        if(check_Month < 10)
            link_date = String(check_Year) + "0" + String(check_Month);
        else
            link_date = String(check_Year) + String(check_Month);

        calendar_Load(link_date, function(data) {
            if(!data.SchoolSchedule) {
                event_NM = "일정 없음";
                event_Date = "";
                cnt = 1;
            }

            else {
                var next_len = data.SchoolSchedule[0].head[0].list_total_count;
                for(var i=0;i<next_len;i++) {
                    var next_Check_Date = String(data.SchoolSchedule[1].row[i].AA_YMD[6]) + String(data.SchoolSchedule[1].row[i].AA_YMD[7]);
                    next_Check_Date *= 1;

                    if(check_Date < next_Check_Date && data.SchoolSchedule[1].row[i].EVENT_NM != "토요휴업일") {
                        event_NM = data.SchoolSchedule[1].row[i].EVENT_NM;
                        event_Date = print_Date(data.SchoolSchedule[1].row[i].AA_YMD);
                        cnt = 1;
                        i = 99999;
                    }
                }
            }
        });
        if(cnt == 1)
            document.getElementById("next_Event").innerText = `다음 일정 : ${event_NM}(${event_Date})`;
        else {
            if(check_Month == 12) {
                check_Month = 1;
                check_Year++;
            } else
                check_Month++;
            check_Date = 1;
        }
    }

    // while(cnt == 0) {
    //     if(check_Month < 10)
    //         link_Today = String(check_Year) + "0" + String(check_Month);
    //     else
    //         link_Today = String(check_Year) + String(check_Month);
    //
    //     if(check_Year == h_date.getFullYear() && check_Month == (h_date.getMonth()+1))
    //         Date = h_date.getDate();
    //     else
    //         Date = 1;
    //
    //
    //     $.getJSON(n_link,
    //         function(data) {
    //             if(!data.SchoolSchedule) {
    //                 event_NM = "일정 없음";
    //                 event_Date = "";
    //                 document.getElementById("next_Event").innerText = `다음 일정 : ${event_NM}(${event_Date})`;
    //                 cnt = 1;
    //             }
    //             var len = data.SchoolSchedule[0].head[0].list_total_count;
    //
    //             for(var i=0;i<len;i++) {
    //                 var list_Date = String(data.SchoolSchedule[1].row[i].AA_YMD[6]) + String(data.SchoolSchedule[1].row[i].AA_YMD[7]);
    //                 list_Date *= 1;
    //
    //                 if(Date < list_Date && data.SchoolSchedule[1].row[i].EVENT_NM != "토요휴업일") {
    //                     event_NM = data.SchoolSchedule[1].row[i].EVENT_NM;
    //                     event_Date = print_Date(data.SchoolSchedule[1].row[i].AA_YMD);
    //                     cnt = 1;
    //                     i++;
    //                 }
    //             }
    //         })
    //         .fail(function (xhr, status, errorThrown) {
    //             console.log("[Error] " + xhr + " " + status + " " + errorThrown);
    //         });
    //     if(cnt == 1) {
    //         document.getElementById("next_Event").innerText = `다음 일정 : ${event_NM}(${event_Date})`;
    //         break;
    //     } else {
    //         if(check_Month == 12) {
    //             check_Month = 1;
    //             check_Year++;
    //         } else
    //             check_Month++;
    //     }
    // }
}