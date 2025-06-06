src/app/company-full-view/company-full-view.component.ts:226:9 - error TS7053: Element implicitly has an 'any' type because expression of type 'string | symbol' can't be used to index type '{ cmpnyName: string; tin: string; }'.
  No index signature with a parameter of type 'string' was found on type '{ cmpnyName: string; tin: string; }'.

226         target[prop] = value;

src/app/company-full-view/company-full-view.component.ts:297:34 - error TS7006: Parameter 'status' implicitly has an 'any' type.

297     this.statusesForm.value.some(status =>
