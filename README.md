
  generateExampleData(): void {
    const exampleData: { [key: string]: any } = {
      'processing-port-code': '4601',
      'preparer-port-code': '4602',
    };

    switch (this.queryType) {
      case 'hts':
        exampleData['from-tariff-number'] = '1234567890';
        exampleData['to-tariff-number'] = '1234567890';
        exampleData['as-of-date'] = new Date().toISOString().split('T')[0];
        break;
      case 'domestic':
      case 'foreign':
        exampleData['port-code'] = '4601';
        break;
      case 'firms':
        exampleData['firms-code'] = '1234567890';
        break;
      case 'country':
        exampleData['country-code-list'] = 'US';
        break;
      case 'carrier':
        exampleData['carrier-code'] = '1234567890';
        break;
      case 'docSubmission':
        exampleData['senderReceiverIDCode'] = '1234567890';
        exampleData['senderReceiverSiteCode'] = '1234567890';
        exampleData['portCodes'] = '4601';
        exampleData['govermentCodes'] = 'CBP';
        exampleData['transactionType'] = 'ENTRY_NBR';
        exampleData['documentLabelCode'] = 'COMMERCIAL_INVOICE';
        exampleData['cargoTransactionUUID'] = '123e4567-e89b-12d3-a456-426614174000';
        exampleData['submittedToPortCode'] = '4601';
        exampleData['actionCode'] = 'A';
        exampleData['transactionNumber'] = '1234567890';
        exampleData['transactionName'] = 'Example Transaction';
        exampleData['transmissionDate'] = new Date().toISOString().split('T')[0];
        exampleData['documentSentDate'] = new Date().toISOString().split('T')[0];
        exampleData['document-id'] = 'DOC123456';
        exampleData['docDescription'] = 'Example Document Description';
        exampleData['fileExt'] = '.pdf';
        exampleData['fileName'] = 'example.pdf';
        break;
    }

    // Only set values for fields that are empty
    Object.keys(exampleData).forEach(key => {
      const control = this.form.get(key);
      if (control && !control.value) {
        control.setValue(exampleData[key]);
      }
    });
  }
