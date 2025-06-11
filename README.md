
{
  "cargoTransactionBatch": {
    "cargoTransactionBatchUUID": "1234567890",
    "senderReceiverIDCode": "ABC123456",
    "senderReceiverSiteCode": "SITE",
    "transmissionDate": "2024-09-05T10:34:47.0Z",
    "senderReceiverOfficeCode": "01",
    "transmittersUserDataText": "Internal Use Data",
    "cargoTransactionBlockList": [
      {
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
            "cargoTransactionUUID": "1234567890",
            "cargoTransactionType": "HA",
            "cargoTransactionPayload": {
              "W-Query-Tariff-NumberList": [
                {
                  "fromTariffNumber": "0105119000",
                  "toTariffNumber": "0105119000",
                  "asOfDate": "2024-09-05"
                },
                {
                  "fromTariffNumber": "8471700000",
                  "toTariffNumber": "8471709040",
                  "asOfDate": "2024-09-05"
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
