import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { taskComponent } from './components/popup/task.component';
import { taskModule } from './components/popup/task.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                taskComponent
            ],
            imports: [taskModule]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
