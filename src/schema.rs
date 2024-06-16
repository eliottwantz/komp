use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ComposeFileSchema {
    pub services: BTreeMap<String, ServiceSchema>,
    pub volumes: BTreeMap<String, Option<String>>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ServiceSchema {
    pub image: String,
    pub restart: String,
    pub ports: Vec<String>,
    pub environment: BTreeMap<String, String>,
    pub volumes: Vec<String>,
}

pub fn create_postgres_schema() -> ServiceSchema {
    let mut s = ServiceSchema {
        image: String::from("postgres:latest"),
        restart: String::from("on-failure"),
        ports: vec![String::from("5432:5432")],
        environment: BTreeMap::new(),
        volumes: vec![String::from("postgres_data:/var/lib/postgresql/data")],
    };

    s.environment
        .insert(String::from("POSTGRES_DB"), String::from("postgres"));
    s.environment
        .insert(String::from("POSTGRES_PASSWORD"), String::from("postgres"));
    s.environment
        .insert(String::from("POSTGRES_USER"), String::from("postgres"));

    s
}
