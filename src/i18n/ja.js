import _ from 'lodash'

export default {
  intro: {
    title: "コールセンター　入電数予測 ✕ シフト最適化",
  },
  header: {
    date: _.template("<%= year %>年/ <%= month %>月"),
    predict: "入電数予測",
    optimization: "シフト最適化",
  },
  main: {
    number: "No",
    name: "名前",
    numOfWorks: "出勤数(月)",
    workingHours: "勤務時間(月)",
    numOfPredicted: "予測件数",
  },
  popover: {
    allSchedule: "すべてのスケジュール",
    dateFormat: "M月D日 (dd)",
  },
  settings: {
    formLabelHoliday: "休日設定",
    submit: "シフトを最適化",
    cancel: "Cancel",
  },
}
