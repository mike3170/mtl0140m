import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProgFormStatus } from 'src/app/core/services/progFormStatus.service';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { MyValidators } from 'src/app/validator/my-validators';
import { MtlPurOrdeM } from '../mtl-pur-orde-m';

@Component({
	selector: 'app-mtl-pur-orde-m',
	templateUrl: './mtl-pur-orde-m.component.html',
	styleUrls: ['./mtl-pur-orde-m.component.scss']
})
export class MtlPurOrdeMComponent implements OnInit {
	@Input() purOrdeMaterBody!: MtlPurOrdeM;

	idList: string[] = [];
	rowIndex = -1;
	formM!: UntypedFormGroup;
	mtlPurOrdeM: MtlPurOrdeM;
	constructor(
		private dialogService: DialogService,
		private fb: UntypedFormBuilder,
		private progFormStatus: ProgFormStatus
	) {
		this.buildForm();
	}

	ngOnInit(): void {
	}

	ngOnChanges(): void {
		this.mtlPurOrdeM = this.purOrdeMaterBody;
		if (this.mtlPurOrdeM?.poNo != undefined) {
			console.log("hello");
			console.log(this.mtlPurOrdeM.poNo);

			this.formM.reset(this.mtlPurOrdeM);
		}
	}

	buildForm() {
		this.formM = this.fb.group({
			"poNo": [""],
			"poDate": [""],
			"venNo": [""],
			"poKind": [""],
			"currNo": [""],
			"paymentTerm": [""],
			"payDays": [""],
			"payKind": [""],
			"canQtyUp": [""],
			"canQtyDn": [""],
			"editDate": [""],
			"editEmp": [""],
			"creaDate": [""],
			"creaEmp": [""],
		}, { updateOn: "blur" });



	};

}
