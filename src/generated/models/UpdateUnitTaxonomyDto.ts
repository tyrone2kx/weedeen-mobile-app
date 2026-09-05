/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnitComponentDto } from './UnitComponentDto';
export type UpdateUnitTaxonomyDto = {
    components: Array<UnitComponentDto>;
    /**
     * Label template referencing component keys, e.g. "{block} {flat_no}"
     */
    labelTemplate: string;
};

