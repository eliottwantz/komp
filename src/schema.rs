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
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
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

pub fn create_mysql_schema() -> ServiceSchema {
    let mut s = ServiceSchema {
        image: String::from("mysql:latest"),
        restart: String::from("on-failure"),
        ports: vec![String::from("3306:3306")],
        environment: BTreeMap::new(),
        volumes: vec![String::from("mysql_data:/var/lib/mysql")],
    };

    s.environment
        .insert(String::from("MYSQL_USER"), String::from("mysql"));
    s.environment
        .insert(String::from("MYSQL_PASSWORD"), String::from("mysql"));
    s.environment
        .insert(String::from("MYSQL_DB"), String::from("mysql"));

    s
}

pub fn create_mailpit_schema() -> ServiceSchema {
    let mut s = ServiceSchema {
        image: String::from("axllent/mailpit:latest"),
        restart: String::from("on-failure"),
        ports: vec![String::from("1025:1025"), String::from("8025:8025")],
        environment: BTreeMap::new(),
        volumes: vec![],
    };

    s.environment
        .insert(String::from("MYSQL_USER"), String::from("mysql"));
    s.environment
        .insert(String::from("MYSQL_PASSWORD"), String::from("mysql"));
    s.environment
        .insert(String::from("MYSQL_DB"), String::from("mysql"));

    s
}
