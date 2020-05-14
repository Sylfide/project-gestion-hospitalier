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

                    
                    weekStart = new Date('2020-' + (month + 1) + '-' + day);
                    // console.log('weekStart :' + weekStart.getMonth());

                    weekEnd = new Date('2020-' + (month + 1) + '-' + Number(day + 7));
                    // console.log('weekEnd :' + weekEnd.getDate());
                    let total = 0;


                    // console.log('start : ', weekStart);
                    // console.log('end : ', weekEnd);

                    for (stat of stats) {
                        
                        if (month == 3 || month == 4) {
                            console.log('debut : ' + total);
                        }
                        let formatedEntryDate = stat.entry_date.getFullYear() + '-' + stat.entry_date.getMonth() + '-' + stat.entry_date.getDate();
                        let formatedExitDate;
                        if (stat.exit_date !== null) {
                            formatedExitDate = stat.exit_date.getFullYear() + '-' + stat.exit_date.getMonth() + '-' + stat.exit_date.getDate();
                        }
                       
                        if (stat.entry_date < weekStart || stat.entry_date <= weekEnd && stat.exit_date >= weekStart && stat.exit_date <= weekEnd) {
                            total++;
                        } else if (stat.entry_date >= weekStart && stat.entry_date <= weekEnd && stat.exit_date > weekEnd) {
                            total++;
                        } else if (stat.entry_date >= weekStart && stat.entry_date <= weekEnd && stat.exit_date >= weekStart && stat.exit_date <= weekEnd) {
                            total++;
                        } else if (stat.entry_date <= weekEnd && stat.exit_date == null) {
                            total++;
                        }

                        if (month == 3 || month == 4) {
                            console.log('fin : ' + total);
                        }
                        // il nous reste (pour le mois d'avril) :  --> il faut que l'entrée soit sup à weekStart mais inf à weekEnd && que sa sortie soit sup à weekStart 
                        // 3 cas : soit l'entrée avant weekStart et sortie entre weekStart et weekEnd 
                        //          soit l'entrée entre weekStart et weekEnd et sortie après weekEnd
                        //          soit l'entrée entre weekStart et weekEnd et sortie entre les 2 aussi
                        // --> sortie null  : soit l'entrée avant weekEnd (inf ou ég) et sortie null 
                            // 25 : entrée : 28 avril sortie : 5 mai
                            // 26 : entrée : 28 avril sortie : 5 mai
                            // 27 : entrée : 28 avril sortie : 5 mai
                                // weekStart = 27 avril
                                // weekEnd = 3 mai

                        
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