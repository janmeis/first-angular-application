import { Component, Inject, OnInit } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { IAddress, shippingText } from 'src/app/models/address';
import { IState } from 'src/app/models/state';

@Component({
  selector: 'app-address-form-dialog',
  templateUrl: './address-form-dialog.component.html',
  styleUrls: ['./address-form-dialog.component.scss']
})
export class AddressFormDialogComponent implements OnInit {
  states$!: Observable<IState[]>;
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });
  hasUnitNumber = false;
  shippingText = shippingText;

  constructor(
    public dialogRef: MatDialogRef<AddressFormDialogComponent>,
    private fb: FormBuilder,
    store: Firestore,
    @Inject(MAT_DIALOG_DATA) public address: IAddress,
  ) {
    const statesColl = collection(store, 'states');
    this.states$ = collectionData(statesColl).pipe(
      map(coll => this.mapStates(coll))
    );
  }

  ngOnInit(): void {
    if (this.address?.firstName)
      this.addressForm.setValue(this.address as any);
  }

  onSubmit(): void {

  }

  resetAddressForm(): void {
    this.addressForm.reset({ shipping: 'free' });
  }

  private mapStates = (statesData: DocumentData[]): IState[] =>
    statesData
      .map(i => i as IState)
      .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
}
