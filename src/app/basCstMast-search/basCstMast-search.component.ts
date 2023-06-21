import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { BasCstMastSearchService } from './basCstMast-search.service';
import { BasCstMast} from './basCstMast.model';

interface inputData {
	kind: string;
}

@Component({
	selector: 'app-basCstMast-search',
	templateUrl: './basCstMast-search.component.html',
	styleUrls: ['./basCstMast-search.component.scss'],
	providers: [BasCstMastSearchService]
})
export class BasCstMastSearchComponent implements OnInit {
	formCstSearch: UntypedFormGroup;
	basCstMastList: BasCstMast[];

	private _mesg: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private basCstMastSearchService: BasCstMastSearchService,
		private dialogRef: MatDialogRef<BasCstMastSearchComponent>,
		private fb: UntypedFormBuilder,
		private dialogService: DialogService) {
		//-----
		this.formCstSearch = this.fb.group({
			cstNo: [],
			cstName: [],
		});

	}

	ngOnInit(): void {
		this.search();
	}

	get mesg(): string {
		// if (!this.codMastist) {
		// 	this._mesg = "請輸入條件";
		// }

		if (this.basCstMastList && this.basCstMastList.length === 0) {
			this._mesg = "查無資料";
		}

		return this._mesg;

	}

	async search() {
		this.basCstMastSearchService.findAll()
			.subscribe(resp => {
				this.basCstMastList = resp.data;
			})
	}


	select(basCstMast: BasCstMast) {
		this.dialogRef.close(basCstMast);
	}

}
