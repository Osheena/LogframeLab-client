import {FilterDto} from '../../services/dto/filter.dto';
import {FilterData} from '../../services/dto/filter-data.dto';
import {forkJoin} from 'rxjs';
import {IndicatorDto} from './indicator.dto';
import {ManageIndicatorsService} from '../../services/indicators-management/manage-indicators.service';
import {IndicatorService} from '../../services/indicator.service';

export class IndicatorsManagement {

  totalRowCount: number;
  page = 1;
  pageSize = 10;
  indicatorList: IndicatorDto[] = [];
  isLoading = false;

  themeFilter: FilterData[] = [];
  sourceFilter: FilterData[] = [];
  levelFilter: FilterData[] = [];
  sdgCodeFilter: FilterData[] = [];
  crsCodeFilter: FilterData[] = [];

  filters = new FilterDto();

  hasFilters = false;

  constructor(public manageIndicatorsService: ManageIndicatorsService, public indicatorService: IndicatorService) {
  }

  private static processFilter(value: string): FilterData {
    const filter = new FilterData();
    filter.text = value;
    filter.value = value;
    return filter;
  }

  processFilters(filters: FilterDto) {
    if (this.hasFilters) {
      return;
    }
    this.themeFilter = filters.themes.map(IndicatorsManagement.processFilter);
    this.sourceFilter = filters.source.map(IndicatorsManagement.processFilter);
    this.levelFilter = filters.level.map(level => {
      const filter = new FilterData();
      filter.text = level.name;
      filter.value = level.id;
      return filter;
    });
    this.sdgCodeFilter = filters.sdgCode.map(IndicatorsManagement.processFilter);
    this.crsCodeFilter = filters.crsCode.map(IndicatorsManagement.processFilter);

    this.hasFilters = true;
  }

  search(reset: boolean, forApproval: boolean): void {
    if (reset) {
      this.page = 1;
    }

    this.isLoading = true;

    const filtersRequest = this.indicatorService.getFilters();
    const indicatorsRequest = forApproval
      ? this.manageIndicatorsService.getIndicatorsForApproval(this.page, this.pageSize, this.filters)
      : this.manageIndicatorsService.getIndicators(this.page, this.pageSize, this.filters);

    forkJoin([filtersRequest, indicatorsRequest]).subscribe(results => {
      const filters = results[0];

      this.processFilters(filters);

      this.isLoading = false;
      if (results[1].ok) {
        const page = results[1].body;
        this.totalRowCount = page.totalElements;
        this.indicatorList = page.content;
      }
    });
  }

  addFilter(filterKey: string, value: string[]) {
    this.filters[filterKey] = value;
  }
}