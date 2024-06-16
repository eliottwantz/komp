use std::fs;

use crate::{errors, schema};

pub fn get_compose_file_path() -> Option<String> {
    let compose_paths = [
        "docker-compose.yaml",
        "docker-compose.yml",
        "compose.yaml",
        "compose.yml",
    ];

    let mut compose_file_path: Option<String> = None;

    for path in compose_paths {
        if std::path::Path::new(path).exists() {
            compose_file_path = Some(path.into());
            break;
        }
    }

    compose_file_path
}

pub fn write_compose_file(
    compose_file_definition: schema::ComposeFileSchema,
) -> errors::Result<()> {
    let path = get_compose_file_path();
    if let Some(p) = path {
        let mut existing_compose_file =
            serde_norway::from_str::<schema::ComposeFileSchema>(&fs::read_to_string(&p)?)?;
        existing_compose_file
            .services
            .extend(compose_file_definition.services);
        existing_compose_file
            .volumes
            .extend(compose_file_definition.volumes);
        let contents = serde_norway::to_string(&existing_compose_file)?;
        fs::write(&p, contents)?;
    } else {
        let contents = serde_norway::to_string(&compose_file_definition)?;
        fs::write("compose.yaml", contents)?;
    }

    Ok(())
}
