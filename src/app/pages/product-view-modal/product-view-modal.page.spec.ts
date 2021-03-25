import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductViewModalPage } from './product-view-modal.page';

describe('ModalPage', () => {
  let component: ProductViewModalPage;
  let fixture: ComponentFixture<ProductViewModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductViewModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
