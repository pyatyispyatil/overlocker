declare module "overlooker" {
  export type ProfileData = {
    [pageName: string]: PageData
  };

  export type AggregatedValue = {
    q1: number,
    q3: number,
    percentile98: number,
    percentile02: number,
    mde: number,
    max: number,
    min: number,
    median: number,
    count: number,
    standardDeviation: number,
    mean: number,
  };

  export type PageData = {
    actions: ProfileActions,
    stats: ProfileStats,
    network: ProfileNetwork
  };

  export type ProfileActions = {
    [actionName: string]: ProfileAction
  };

  export type ProfileAction = {
    network: ProfileNetwork,
    stats: ActionStats
  };

  export type ActionStats = {
    evaluation: ProfileStatsEvaluation,
    resources: ProfileStatsResources,
    timings: ActionsTimings
  };

  export type ActionsTimings = {
    start: AggregatedValue,
    end: AggregatedValue
  };

  export type ProfileStats = {
    evaluation: ProfileStatsEvaluation,
    resources: ProfileStatsResources,
    timings: ProfileStatsTimings,
    userCentric: ProfileStatsUserCentric,
    coverage: ProfileStatsCoverage,
    custom: ProfileStatsCustom
  };

  export type ProfileStatsEvaluation = {
    external: AggregatedValue,
    internal: AggregatedValue,
    total: AggregatedValue
  };

  export type ProfileStatsCoverage = {
    internal: ProfileStatsCoverageSection
    external: ProfileStatsCoverageSection
  };

  export type ProfileStatsCustom = {
    timings: {
      [dottedName: string]: number
    },
    durations: {
      [dottedName: string]: number | {
        total: number,
        count: number
      },
    }
  };

  export type ProfileStatsCoverageSection = {
    js: {
      used: number,
      total: number
    },
    css: {
      used: number,
      total: number
    }
  };

  export type ProfileStatsResources = {
    internal: ProfileStatsResourcesSection,
    external: ProfileStatsResourcesSection,
    total: ProfileStatsResourcesSection,
  };

  export type ProfileStatsResourcesSection = {
    css: ResourceSize,
    js: ResourceSize,
    fonts: ResourceSize,
    html: ResourceSize,
    images: ResourceSize,
    total: ResourceSize
  };

  export type ResourceSize = {
    size: AggregatedValue,
    transfer: AggregatedValue
  };

  export type ProfileStatsTimings = {
    firstMeaningfulPaint: AggregatedValue,
    firstMeaningfulPaintCandidate: AggregatedValue,
    firstPaint: AggregatedValue,
    firstTextPaint: AggregatedValue,
    firstImagePaint: AggregatedValue,
    firstContentfulPaint: AggregatedValue,
    domContentLoadedEventStart: AggregatedValue,
    domContentLoadedEventEnd: AggregatedValue,
    loadEventStart: AggregatedValue,
    loadEventEnd: AggregatedValue,
    domInteractive: AggregatedValue,
    domComplete: AggregatedValue
  };

  export type ProfileStatsUserCentric = {
    speedIndex: AggregatedValue,
    heroElements: {
      [heroElementName: string]: {
        firstPaint: AggregatedValue,
        lastPaint: AggregatedValue
      }
    }
  };

  export type ProfileNetwork = Array<ProfileRequest>;

  export type ProfileRequest = {
    size: number,
    transfer: number,
    timings: {
      start: number,
      response: number,
      firstByte: number,
      finish: number,
      total: number
    },
    evaluation: Array<{
      url: string,
      duration: number,
      timings: {
        start: number,
        end: number
      }
    }>,
    coverage?: {
      total: number,
      used: number,
      ranges: Array<{
        start: number,
        end: number
      }>
    },
    evaluationTotal: number,
    meta?: RequestMeta,
    type: string,
    url: string,
    count: number,
    internal: boolean,
    extension: string,
    status: number,
    method: string
  };

  export type RequestMeta = {
    canBeInitial: boolean,
    files: Array<string>,
    groups: Array<string>,
    id: number,
    modules: Array<Module>,
  };

  export type Module = {
    deopt: Array<string>,
    deps: Array<{
      module: string
    }>,
    file: string,
    id: string,
    isEntry: boolean,
    reasons: Array<{
      module: string
    }>,
    size: number,
    source: Source,
    type: string
  };

  export type Source = {
    ext: string,
    hash: string,
    nodeModule: {
      name: string,
      version: string
    },
    path: string,
    size: number
  };

  export type ComparedData = {
    [pageName: string]: ComparedPageData
  };

  export type ComparedPageData = {
    absolute: ComparedDataAbsolute,
    percent: ComparedDataPercent
  };

  export type ComparedDataPercent = {
    actions: ComparedActionsPercent,
    stats: ProfileStats,
  };

  export type ComparedDataAbsolute = {
    actions: ComparedActionsAbsolute,
    stats: ProfileStats,
    network: ComparedNetwork
  };

  export type ComparedActionsAbsolute = {
    [actionName: string]: ComparedActionAbsolute
  };

  export type ComparedActionAbsolute = {
    stats: ProfileStats,
    network: ComparedNetwork
  };

  export type ComparedActionsPercent = {
    [actionName: string]: ComparedActionPercent
  };

  export type ComparedActionPercent = {
    stats: ProfileStats
  };

  export type ComparedNetwork = Array<ComparedRequest>;

  export type ComparedRequest = {
    contentStatus: 'changed' | 'not_changed',
    difference: ProfileRequest,
    fileStatus: 'new' | 'lose' | 'not_changed' | 'changed',
    modules: {
      similar: Array<RequestMeta>,
      added: Array<RequestMeta>,
      removed: Array<RequestMeta>,
      changed: Array<RequestMeta>,
    },
    requests: [ProfileRequest, ProfileRequest]
  };

  export type CheckedData = {
    success: boolean,
    results: {
      [pageName: string]: CheckedPageData
    }
  };

  export type CheckedPageData = {
    success: boolean,
    results: Array<{
      splitPath: Array<string>,
      path: string,
      threshold: number,
      value: number,
      difference: number,
      status: 'warning' | 'worsening' | 'partial_worsening' | 'improvement' | 'partial_improvement' | 'without_changes'
    }>
  };

  export type BuildData = Object;

  export type Rule = string | RegExp | ((url: string) => boolean) | Array<string | RegExp | Function>;

  export type Cookies = Array<{
    name: string,
    value: string,
    domain: string
  }>;

  export type ProfileConfig = {
    pages: Array<{
      name: string,
      url: string,
      heroElements?: {
        [heroElementName: string]: string
      },
      cookies?: Cookies,
      actions?: Array<{
        name: string,
        action: (page: Object) => Promise<void>
      }>
    }>,
    host?: string,
    throttling?: {
      cpu?: number,
      network?: 'GPRS' | 'Regular2G' | 'Good2G' | 'Regular3G' | 'Good3G' | 'Regular4G' | 'DSL' | 'WiFi'
    },
    cookies?: Cookies,
    proxy?: {
      address: string,
      restart: () => Promise<void>
    },
    firstEvent?: string,
    count?: number,
    threads?: number,
    logger?: (message: string) => Promise<any>,
    progress?: (progress: number) => Promise<any>,
    checkStatus?: () => Promise<boolean>,
    platform?: 'mobile' | 'desktop',
    browserArgs?: Array<string>,
    buildData?: {
      url?: string,
      getter?: (url: string) => Promise<BuildData>
    },
    requests?: {
      ignore?: Rule,
      merge?: Rule,
      internalTest?: Rule,
    }
  };

  export type Thresholds = { [path: string]: number };

  export type ThresholdsByPage = {
    [pageName: string]: Thresholds
  }

  export function profile(config: ProfileConfig): Promise<ProfileData>;

  export function comparePages(firstData: ProfileData, secondData: ProfileData, onlyStats: boolean): ComparedData;

  export function checkPages(compared: ComparedData, thresholdsByPage: ThresholdsByPage): CheckedData;

  export function compare(firstPage: PageData, secondPage: PageData, onlyStats: boolean): ComparedPageData;

  export function check(comparedPageData: ComparedPageData, thresholds: Thresholds): CheckedPageData;

  export function merge(profileData: ProfileData): PageData;
}
