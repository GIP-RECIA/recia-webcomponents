export type StructureDetail = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  otherAttributes: Array<{
    ESCOStructureLogo?: Array<{}>;
    ENTStructureSiteWeb?: Array<{}>;
    ENTStructureJointure?: Array<{}>;
  }>;
  structCustomDisplayName: string | null;
  structLogo: string | null;
  structSiteWeb: string | null;
};
