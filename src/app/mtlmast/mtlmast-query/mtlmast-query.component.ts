import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiStatus } from 'src/app/core/etc/models/api.model';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { FormUtils } from 'src/app/utils/formUtils';
import { StrUtils } from 'src/app/utils/strUtils';
import { MtlMastService } from '../mtlmast.service';

@Component({
	selector: 'app-mtlmast-query',
	templateUrl: './mtlmast-query.component.html',
	styleUrls: ['./mtlmast-query.component.scss'],
	providers: [ MtlMastService ]
})
export class MtlMastQueryComponent implements OnInit, AfterViewInit, OnDestroy {
	formQuery: UntypedFormGroup;
	custName: string;

	subscriptions: Subscription[] = [];

	constructor(
		private mtlMastService: MtlMastService,
		private dialogRef: MatDialogRef<MtlMastQueryComponent>,
		private dialogService: DialogService,
		private fb: UntypedFormBuilder) {

		this.buildForm();
	}


	ngOnInit(): void {
		const sub = this.formQuery.controls['mtlNoB'].valueChanges
			.pipe(
				filter(mtlNoB => !StrUtils.isEmpty(mtlNoB)),
				debounceTime(333),
				distinctUntilChanged(),
				switchMap((mtlNoB: string) => this.mtlMastService.findById(mtlNoB)),
			)
			.subscribe(resp => {
				if (resp.status === ApiStatus.OK) {
					this.custName = resp.data.custName;
				}
			});

		this.subscriptions.push(sub);
	}

	ngAfterViewInit(): void {
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	buildForm() {
		this.formQuery = this.fb.group({
			"mtlNoB": [""],
			"mtlNoE": [""],
			"mtlGrade": [""]
		});

	}

	query() {
		if (this.formQuery.invalid) {
			this.dialogService.snack("條件錯誤");
			return;
		}

		if (FormUtils.isEmpty(this.formQuery)) {
			this.dialogService.snack("請輸入查詢條件");
			return;
		}

		const matrix = FormUtils.getMartixVariables(this.formQuery);
		this.dialogRef.close(matrix);
	}

	cancel() {
		this.dialogRef.close(null);
	}

	clear() {
		this.formQuery.reset();
	}

	// tbd ???
	searchCustomer() {
		alert("not yet");
	}

} // class
