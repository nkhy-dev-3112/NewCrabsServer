'use strict'

const models = require('../../models');
const { Op } = require('sequelize');

class FinancialController {
    static async revenueStatisticOverview(req, res) {
        await models.Transaction.findAll({
            attributes: ['total', 'discount', 'platformFee', 'time', 'stateId'],
            where: {
                stateId: 8
            }
        }).then((data) => {
            const jsonData = data.map(item => item.toJSON());

            jsonData.forEach(item => {
                item.total = item.total - item.discount - item.platformFee;
                delete item.discount;
                delete item.platformFee;
            });

            // Get the current date
            const currentDate = new Date();

            // Get the current day, month, and year
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1; // Month starts from 0
            const currentYear = currentDate.getFullYear();

            // Filter transactions based on today, this month, and this year
            const todayTransactions = jsonData.filter(item => {
                const transactionDate = new Date(item.time);
                return (
                    transactionDate.getDate() === currentDay &&
                    transactionDate.getMonth() + 1 === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                );
            });

            const thisMonthTransactions = jsonData.filter(item => {
                const transactionDate = new Date(item.time);
                return (
                    transactionDate.getMonth() + 1 === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                );
            });

            const thisYearTransactions = jsonData.filter(item => {
                const transactionDate = new Date(item.time);
                return transactionDate.getFullYear() === currentYear;
            });

            res.json({
                overview: jsonData.reduce((sum, item) => { return sum + item.total; }, 0),
                thisYear: thisYearTransactions.reduce((sum, item) => { return sum + item.total; }, 0),
                thisMonth: thisMonthTransactions.reduce((sum, item) => { return sum + item.total; }, 0),
                todayTransactions: todayTransactions.reduce((sum, item) => { return sum + item.total; }, 0)
            });
        }).catch((err) => {
            res.json({
                message: "Cannot get revenue overview statistic",
                detail: err.message()
            })
        })
    }
}

module.exports = FinancialController