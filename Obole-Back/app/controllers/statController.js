const dataMapper = require('../dataMapper');
const moment = require('moment');

const statController = {

    occupationStat: async (req, res) => {

        try {

            const stats = await dataMapper.getOccupationStat();
    
            // console.log(stats);

            // console.log(moment("2020-02", "YYYY-MM").daysInMonth());

            let monthStats = [];

            for (month = 0; month <= 11; ++month) {

                let weekNb = 1;
                let obj = {};
                // Object.defineProperty(obj, 'month', {value : month});
                obj.month = month;

                for (day = 1; day <= moment("2020-" + (month+1), "YYYY-MM").daysInMonth(); day = day + 7) {

                    let weekStart = '2020-' + month + '-' + day;
                    let weekEnd = '2020-' + month + '-' + Number(day + 7);
                    let total = 0;

                    // console.log('start : ', weekStart);
                    // console.log('end : ', weekEnd);

                    for (stat of stats) {
                        
                        let formatedEntryDate = stat.entry_date.getFullYear() + '-' + stat.entry_date.getMonth() + '-' + stat.entry_date.getDate();

                        if (stat.deceased_id === 25) {
                            console.log(formatedEntryDate + ' : ' + weekStart);
                        }

                        if (stat.entry_date.getMonth() <= month && formatedEntryDate >= weekStart) {

                            if (stat.exit_date == null) {
                                total++;
                            } else {

                                let formatedExitDate = stat.exit_date.getFullYear() + '-' + stat.exit_date.getMonth() + '-' + stat.exit_date.getDate();
                                // console.log(formatedExitDate);
    // 
                                if (formatedExitDate < weekStart) {
                                    continue;
                                }
                                
                                if (formatedExitDate >= weekStart && formatedExitDate <= weekEnd) {
                                    total++;
                                }

                                if (formatedExitDate > weekEnd) {
                                    total++;
                                }
                            }
                        }
                    }

                    obj['week ' + weekNb] = total;
                    weekNb++;
                } 

                monthStats.push(obj);

            }

            res.status(200).send(monthStats);

        } catch(err) {
            console.trace(err);
            res.status(500).send(err);
        }

    },

};

module.exports = statController;