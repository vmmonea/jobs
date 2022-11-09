const moment = require("moment/moment");

const toWorkJobs = [];

module.exports.createJobsQueue = (jobs, start) => {

    //verificando se algum job tem mais de 8 horas
    jobs = jobs.filter(job => job.estimateTime <= 8);
    //verificando se os jobs vão conseguir ser executados a tempo!
    jobs = jobs.filter(({ estimateTime, maxDate }) => {
        const previewDate = start.clone().add(estimateTime, 'hours');
        return previewDate.isBefore(moment(maxDate));
    });

    console.log(jobs)

    while (jobs.length !== 0) {
        for (let i = 0; i < jobs.length; i++) {
            console.log(`este e o ${i}`)
            const queueJob = [];
            queueJob.push(jobs[i]);
            jobs.splice(i, 1)
            for (let j = 0; j < jobs.length; j++) {
                const { estimateTime, maxDate } = jobs[j];

                var totalTime = queueJob.reduce((prev, curr) => prev.estimateTime || 0 + curr.estimateTime || 0, 0)
                const previewDate = start.clone().add(totalTime + estimateTime, 'hours')

                //verifica se passa das 8 horas e se da tempo de executar mais um job dentro do max date
                if ((totalTime + estimateTime) > 8 || previewDate.isAfter(moment(maxDate))) {
                    console.log('not able to execute, do nothing')
                } else {
                    console.log(`dando push no ${i} ${j}`)
                    queueJob.push(jobs[j]);
                    jobs.splice(j, 1)
                }

            }
            toWorkJobs.push(queueJob);
        }
    }

    console.log(toWorkJobs)
    // console.log(jobs)
}