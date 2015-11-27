import moment from 'moment';

/*@ngInject*/ class TimeBlockConverter {


  static blockToTime(beginHours, blockNumber) {
    // block number shall start from 0
    // since block is 15 minutes
    let hoursPassed = blockNumber / 4;
    let minutesPassed = (blockNumber % 4) * 15;

    // console.log('hoursPassed:', hoursPassed);
    // console.log('minutesPassed:', minutesPassed);

    let time =
      moment({
        hour: beginHours + hoursPassed,
        minute: minutesPassed
      });

    return time;
  }

  static timeToBlock(beginHours, time) {
    // block size is 15 minutes

    let begin = moment().hour(beginHours).startOf('hour');

    let mTime = moment(time);
    let end = moment({
      hour: mTime.hour(),
      minute: mTime.minute()
    });

    let diff = end - begin;
    let diffMinutes = diff / 1000 / 60;

    // console.log('timeToBlock:', time, end, diffMinutes);
    return diffMinutes / 15;
  }

  static dateFromat(momentDate) {
    return momentDate.format('YYYY-MM-DD');
  }

}
