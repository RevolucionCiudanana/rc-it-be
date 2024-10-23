const multer = require("multer");
const AWS = require("aws-sdk");
const db = require("../models");
const eventDocuments = db.eventDocument;

module.exports = function (app) {
    const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
    const s3Client = new AWS.S3({
        endpoint: spacesEndpoint,
        region: "fra1",
        credentials: {
            accessKeyId: "DO007FYKN8R7G7L4ZBCB",
            secretAccessKey: "5dkD71dyiZHvA+pUnBl1Ho7kRS6hCwtkjziHT7WN3ew",
        },
    });

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    app.post(
        "/api/upload/uploadEventDocuments",
        upload.array("files"),
        async (req, res) => {
            const files = req.files;
            const eventId = req.body.eventId;

            if (!files) {
                return res.status(400).send("No files were uploaded.");
            }

            // Upload each file to Digital Ocean Spaces
            const uploadPromises = files.map((file, index) => {
                const timestamp = Date.now();
                const params = {
                    Bucket: "rc-italia",
                    Key:
                        "documents/event/" +
                        entityId +
                        "/" +
                        timestamp +
                        "/" +
                        file.originalname,
                    Body: file.buffer,
                };

                return s3Client.upload(params).promise();
            });

            Promise.all(uploadPromises)
                .then((results) => {
                    const response = {
                        success: true,
                        message: "Documents uploaded successfully",
                        files: results,
                    };

                    for (let result of results) {
                        // Save document info in eventDocuments instead of userDocuments
                        eventDocuments.create({
                            entityId: entityId,
                            etag: result?.ETag,
                            location: result?.Location,
                            keyFile: result?.Key,
                            bucket: result?.Bucket,
                        });
                        var parts = result?.Key.split("/");
                        var fileName = parts[parts.length - 1];

                        res
                            .status(201)
                            .send({ message: fileName + " aggiunto con successo!" });
                    }
                })
                .catch((error) => {
                    const response = {
                        success: false,
                        message: "Error uploading files",
                        error: error.message,
                    };
                    res.status(500).json(response);
                });
        }
    );


    // Route to delete a file
    app.post("/api/upload/deleteDocument", async (req, res) => {
        const key = req.body.key;

        const params = {
            Bucket: "rc-italia",
            Key: key,
        };

        s3Client.deleteObject(params, (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            console.log("File deleted successfully", data);
            userDocuments
                .destroy({ where: { keyFile: key } })
                .then(() => {
                    return res
                        .status(201)
                        .send({ message: "Documento cancellato con successo!" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error.message });
                });
        });
    });
};
