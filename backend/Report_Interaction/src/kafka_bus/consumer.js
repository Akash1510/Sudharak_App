const { Kafka } = require("kafkajs");

const ReportRepository = require("../repositories/report.repository");

const kafka = new Kafka({
    clientId: "report-interaction-service",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
    groupId: "report-interaction-group"
});

const startConsumer = async () => {

    try {

        await consumer.connect();
        console.log("Kafka Consumer Connected");

        await consumer.subscribe({
            topic: "report_events",
            fromBeginning: false
        });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const data = JSON.parse(message.value.toString());

                    console.log("Event Received: ", data);

                    if (data.event === "Report_Created") {
                   const res =  await ReportRepository.createPost(
                            data.report_id,
                            data.department
                        );

                        console.log("Mongo 3 Interaction Created for : ", res);
                    }

                } catch (error) {
                    console.error("Error Processing Message:", error.message);

                }
            }
        });

    } catch (error) {

        console.error("Kafka Consumer Error: ", error.message);

    }
};

module.exports = startConsumer