const toWorkJobs = [];
const jobs = [
    {
        "id": 1,
        "description": "Importação de arquivos de fundos",
        "maxDate": '2021-02-04 12:00:00',
        "estimateTime": 8
    },
    {
        "id": 2,
        "description": 'Importação de dados da Base Legada',
        "maxDate": '2021-02-04 12:00:00',
        "estimateTime": 4
    },
    {
        "id": 3,
        "description": 'Importação de dados',
        "maxDate": '2021-02-02 12:00:00',
        "estimateTime": 6
    },
    {
        "id": 4,
        "description": 'Desenvolver historia 745',
        "maxDate": '2021-02-02 12:00:00',
        "estimateTime": 2
    },
    {
        "id": 5,
        "description": 'Gerar QRCode',
        "maxDate": '2020-02-15 12:00:00',
        "estimateTime": 6
    },
    {
        "id": 6,
        "description": 'Importação de dados de integração',
        "maxDate": '2020-02-15 12:00:00',
        "estimateTime": 8
    },
]

const start = new Date('2019-11-10 08:00:00').getTime();
const end = new Date('2019-11-11 12:00:00').getTime();

jobs.sort((a, b) => b.estimateTime - a.estimateTime);

while (jobs.length !== 0) {
    for (let i = 0; i < jobs.length; i++) {
        console.log(i)
        const queueJob = [];
        // const { estimateTime } = jobs[i];
        queueJob.push(jobs[i]);
        jobs.splice(i, 1)
        for (let j = 0; j < jobs.length; j++) {
            var totalTime = queueJob.reduce((prev, curr) => prev.estimateTime || 0 + curr.estimateTime || 0, 0)
            const { estimateTime } = jobs[j];
            if ((totalTime + estimateTime) > 8) {
                console.log('is bigger than 8, do fck nothing')
            } else {
                console.log(`dando push no ${j}`)
                queueJob.push(jobs[j]);
                jobs.splice(j, 1)
            }

        }
        toWorkJobs.push(queueJob);
    }
}

console.log(toWorkJobs)
// console.log(jobs)