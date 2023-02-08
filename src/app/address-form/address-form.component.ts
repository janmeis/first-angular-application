import { Component, OnInit, ViewChild } from '@angular/core';
import { addDoc, collectionData, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { collection, CollectionReference, DocumentData } from '@firebase/firestore';
import { map, Observable } from 'rxjs';

/// <see cref="https://material.angular.io/guide/schematics#address-form-schematic" />

interface IState {
  id: string;
  name: string;
  abbreviation: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @ViewChild('form') private form!: NgForm;
  itemColl!: CollectionReference<DocumentData>;
  addressColl!: CollectionReference<DocumentData>;
  states$!: Observable<IState[]>;
  addresses$!: Observable<{ firstName: string; lastName: string }[]>;
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

  // states = [
  //   { name: 'Alabama', abbreviation: 'AL' },
  //   { name: 'Alaska', abbreviation: 'AK' },
  //   { name: 'American Samoa', abbreviation: 'AS' },
  //   { name: 'Arizona', abbreviation: 'AZ' },
  //   { name: 'Arkansas', abbreviation: 'AR' },
  //   { name: 'California', abbreviation: 'CA' },
  //   { name: 'Colorado', abbreviation: 'CO' },
  //   { name: 'Connecticut', abbreviation: 'CT' },
  //   { name: 'Delaware', abbreviation: 'DE' },
  //   { name: 'District Of Columbia', abbreviation: 'DC' },
  //   { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
  //   { name: 'Florida', abbreviation: 'FL' },
  //   { name: 'Georgia', abbreviation: 'GA' },
  //   { name: 'Guam', abbreviation: 'GU' },
  //   { name: 'Hawaii', abbreviation: 'HI' },
  //   { name: 'Idaho', abbreviation: 'ID' },
  //   { name: 'Illinois', abbreviation: 'IL' },
  //   { name: 'Indiana', abbreviation: 'IN' },
  //   { name: 'Iowa', abbreviation: 'IA' },
  //   { name: 'Kansas', abbreviation: 'KS' },
  //   { name: 'Kentucky', abbreviation: 'KY' },
  //   { name: 'Louisiana', abbreviation: 'LA' },
  //   { name: 'Maine', abbreviation: 'ME' },
  //   { name: 'Marshall Islands', abbreviation: 'MH' },
  //   { name: 'Maryland', abbreviation: 'MD' },
  //   { name: 'Massachusetts', abbreviation: 'MA' },
  //   { name: 'Michigan', abbreviation: 'MI' },
  //   { name: 'Minnesota', abbreviation: 'MN' },
  //   { name: 'Mississippi', abbreviation: 'MS' },
  //   { name: 'Missouri', abbreviation: 'MO' },
  //   { name: 'Montana', abbreviation: 'MT' },
  //   { name: 'Nebraska', abbreviation: 'NE' },
  //   { name: 'Nevada', abbreviation: 'NV' },
  //   { name: 'New Hampshire', abbreviation: 'NH' },
  //   { name: 'New Jersey', abbreviation: 'NJ' },
  //   { name: 'New Mexico', abbreviation: 'NM' },
  //   { name: 'New York', abbreviation: 'NY' },
  //   { name: 'North Carolina', abbreviation: 'NC' },
  //   { name: 'North Dakota', abbreviation: 'ND' },
  //   { name: 'Northern Mariana Islands', abbreviation: 'MP' },
  //   { name: 'Ohio', abbreviation: 'OH' },
  //   { name: 'Oklahoma', abbreviation: 'OK' },
  //   { name: 'Oregon', abbreviation: 'OR' },
  //   { name: 'Palau', abbreviation: 'PW' },
  //   { name: 'Pennsylvania', abbreviation: 'PA' },
  //   { name: 'Puerto Rico', abbreviation: 'PR' },
  //   { name: 'Rhode Island', abbreviation: 'RI' },
  //   { name: 'South Carolina', abbreviation: 'SC' },
  //   { name: 'South Dakota', abbreviation: 'SD' },
  //   { name: 'Tennessee', abbreviation: 'TN' },
  //   { name: 'Texas', abbreviation: 'TX' },
  //   { name: 'Utah', abbreviation: 'UT' },
  //   { name: 'Vermont', abbreviation: 'VT' },
  //   { name: 'Virgin Islands', abbreviation: 'VI' },
  //   { name: 'Virginia', abbreviation: 'VA' },
  //   { name: 'Washington', abbreviation: 'WA' },
  //   { name: 'West Virginia', abbreviation: 'WV' },
  //   { name: 'Wisconsin', abbreviation: 'WI' },
  //   { name: 'Wyoming', abbreviation: 'WY' }
  // ];

  constructor(
    private fb: FormBuilder,
    private store: Firestore
  ) {
    this.itemColl = collection(this.store, 'items');
    this.addressColl = collection(this.store, 'addresses');
  }

  ngOnInit(): void {
    this.states$ = collectionData(this.itemColl).pipe(
      map(coll => coll
        .map(i => i as IState)
        .sort((a, b) =>
          a.name > b.name
            ? 1
            : a.name < b.name
              ? -1
              : 0
        )
      )
    );

    this.addresses$ = collectionData(this.addressColl).pipe(map(addresses => addresses.map(a => ({ firstName: a['firstName'], lastName: a['lastName'] }))))

    // this.states.forEach(async s => {
    //   await addDoc(this.coll, s);
    // });
  }

  async onSubmit(): Promise<void> {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      this.resetAddressForm();
      const key = this.getKey(address);
      await setDoc(doc(this.store, 'addresses', key), address);
    }
  }

  resetAddressForm(): void {
    this.form.resetForm();
    this.addressForm.get('shipping')?.setValue('free');
  }

  async onAddressClicked(address: { firstName: string; lastName: string; }): Promise<void> {
    const key = this.getKey(address);
    const docRef = doc(this.store, 'addresses', key);
    const docSnap = await getDoc(docRef);
    const data: any = docSnap.data();
    this.addressForm.setValue(data);
  }

  private getKey = (address: { firstName: string; lastName: string } | any): string => `${address.firstName} ${address.lastName}`.replace(' ', '_').toLowerCase();
}
