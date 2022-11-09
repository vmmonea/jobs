
const moment = require('moment');
const { createJobsQueue } = require('../src/script');

const start = moment('2019-11-10 08:00:00');

var jobs = [
    {
        "id": 1,
        "description": "Importação de arquivos de fundos",
        "maxDate": '2021-02-04 12:00:00',
        "estimateTime": 8
    },
    {
        "id": 2,
        "description": 'Importação de dados da Base Legada',
        "maxDate": '2019-11-10 12:00:00',
        "estimateTime": 2
    },
    {
        "id": 3,
        "description": 'Importação de dados',
        "maxDate": '2019-11-10 14:00:00',
        "estimateTime": 2
    },
    {
        "id": 4,
        "description": 'Desenvolver historia 745',
        "maxDate": '2019-11-10 11:00:00',
        "estimateTime": 4
    },
    {
        "id": 5,
        "description": 'Gerar QRCode',
        "maxDate": '2019-11-10 16:00:00',
        "estimateTime": 4
    },
    {
        "id": 6,
        "description": 'Importação de dados de integração',
        "maxDate": '2020-02-15 12:00:00',
        "estimateTime": 4
    },
];


const queueJobs = createJobsQueue(jobs, start)

for (let i = 0; i < queueJobs.length; i++) {
    const queue = queueJobs[i];
    test(`testing the total time of the queue ${i}`, () => {

        const totalTime = queue.reduce((prev, curr) => prev.estimateTime || 0 + curr.estimateTime || 0, 0)

        expect(totalTime).toBeLessThanOrEqual(8)
    });


    for (let j = 0; j < queue.length; j++) {
        test(`testing the max date of the job ${j} on queue ${i}`, () => {
            const job = queue[j];

            const previewDate = start.clone().add(job.estimateTime, 'hours')

            expect(previewDate.isAfter(moment(job.maxDate))).toBeFalsy()
        });

    }


}
