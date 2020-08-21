 import { BaseRepo } from "./fsrepo";
 import { Site, Project,Schema,Field ,Artifact,ArtifactItem  } from "jwala-lib";

export class ProjectList extends BaseRepo<Project> {
	constructor(){
        super("projectList");
    }
}
export class SiteList extends BaseRepo<Site> {
	constructor(){
        super("siteList");
    }
}

export class ArtifactList extends BaseRepo<Artifact> {
	constructor(){
        super("artifactList");
    }
}

export class ArtifactItemList extends BaseRepo<ArtifactItem> {
	constructor(){
        super("artifactItemsList");
    }
}

export class SchemaList extends BaseRepo<Schema> {
	constructor(){
        super("schemaList");
    }
}

export class FieldList extends BaseRepo<Field> {
	constructor(){
        super("fieldList");
    }
}


