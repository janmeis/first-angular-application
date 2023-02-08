import { Component } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { AddressFormDialogComponent } from '../components/address-form-dialog/address-form-dialog.component';
import { IAddress, shippingText } from '../models/address';
import { IState } from '../models/state';
import { getKey } from '../services/common-functions';

@UntilDestroy()
@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {
  states$!: Observable<IState[]>;
  addresses$!: Observable<IAddress[]>;
  displayedColumns: string[] = [
    'company',
    'lastName',
    'address',
    'city',
    'state',
    'postalCode',
    'shipping'
  ];
  shippingText = shippingText;

  constructor(
    private dialog: MatDialog,
    private store: Firestore,
  ) {
    const statesColl = collection(store, 'states');
    this.states$ = collectionData(statesColl).pipe(map(coll => coll.map(i => i as IState)));

    const addressColl = collection(store, 'addresses');
    this.addresses$ = collectionData(addressColl).pipe(map(addresses => addresses.map(a => (a as IAddress))))
  }

  onRowClicked(row?: IAddress): void {
    const dialogRef = this.dialog.open(AddressFormDialogComponent, {
      width: '60%',
      data: row,
    });

    dialogRef.afterClosed().pipe(
      untilDestroyed(this)
    ).subscribe(async (address: IAddress | null) => {
      if (address?.firstName) {
        const key = getKey(address);
        await setDoc(doc(this.store, 'addresses', key), address);
      }
    });
  }
}
