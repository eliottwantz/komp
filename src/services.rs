use std::collections::BTreeMap;
use std::fmt;

use crate::errors::Result;
use crate::{file::write_compose_file, schema};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Service {
    Postgres,
    MySQL,
    Mailpit,
}

impl fmt::Display for Service {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

pub fn add_services(services: Vec<Service>) -> Result<()> {
    let mut compose_file = schema::ComposeFileSchema {
        services: BTreeMap::new(),
        volumes: BTreeMap::new(),
    };

    for service in services {
        match service {
            Service::Postgres => {
                compose_file
                    .services
                    .insert("postgres".into(), schema::create_postgres_schema());
                compose_file.volumes.insert("postgres_data".into(), None);
            }
            Service::MySQL => {
                compose_file
                    .services
                    .insert("mysql".into(), schema::create_mysql_schema());
                compose_file.volumes.insert("mysql_data".into(), None);
            }
            Service::Mailpit => {
                compose_file
                    .services
                    .insert("mailpit".into(), schema::create_mailpit_schema());
            }
        }
    }

    write_compose_file(compose_file)
}
