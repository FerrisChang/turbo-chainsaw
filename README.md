{
    "cargoTransactionBatch": {
        "cargoTransactionBatchUUID": "1234567890",
        "senderReceiverIDCode": "ABC123456",
        "senderReceiverSiteCode": "SITE",
        "transmissionDate": "042024",
        "senderReceiverOfficeCode": "01",
        "transmittersUserDataText": "Internal Use Data",
        "cargoTransactionBlockList": [
            {
                "cargoTransactionBlock": {
                    "processingDistrictPortCode": "0901",
                    "processingFilerCode": "ABC",
                    "processingFilerOfficeCode": "01",
                    "preparerDistrictPortCode": "0901",
                    "preparerFilerCode": "XYZ",
                    "preparerOfficeCode": "02",
                    "preparerIndicator": "1",
                    "filerPreparersUserDataText": "Filer/Preparer Internal Use Data",
                    "cargoTransactionList": [
                        {
                            "cargoTransaction": {
                                "cargoTransactionUUID": "1234567890",
                                "cargoTransactionType": "HA",
                                "W-Query-Tariff-NumberList": [
                                    {
                                        "fromTariffNumber": "0105119000",
                                        "toTariffNumber": "0105119000",
                                        "asOfDate": "042024"
                                    },
                                    {
                                        "fromTariffNumber": "8471700000",
                                        "toTariffNumber": "8471709040",
                                        "asOfDate": null
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}
