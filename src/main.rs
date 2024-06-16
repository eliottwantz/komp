mod command;
mod errors;
mod file;
mod schema;

use std::{any, collections::BTreeMap, fs};

use clap::Parser;
use command::run_main;
use errors::Result;
use file::write_compose_file;
use schema::create_postgres_schema;

#[derive(Parser)]
#[command(name = clap::crate_name!())]
#[command(
    about = clap::crate_description!(),
    long_about = None
)]
#[command(version = "0.1.0", author = clap::crate_authors!("\n"))]
struct Cli {}

fn main() -> Result<()> {
    // Set a no-op Ctrl-C handler so that Ctrl-C results in
    // `Esc` behavior because of a `term.read_key()` error
    // instead of terminating the process. You can skip
    // this step if you have your own Ctrl-C handler already set up.
    //
    // We cannot (easily) handle this at the library level due to
    // https://github.com/Detegr/rust-ctrlc/issues/106#issuecomment-1887793468.
    // ctrlc::set_handler(move || {}).expect("setting Ctrl-C handler");

    // let _cli = Cli::parse();

    // run_main()

    // // let mut compose_schema = schema::ComposeFileSchema {
    // //     services: schema::ServicesSchema {
    // //         postgres: Some(schema::PostgresSchema {
    // //             image: String::from("postgres:latest"),
    // //             restart: String::from("on-failure"),
    // //             ports: vec![String::from("5432:5432")],
    // //             environment: schema::PostgresEnvironment {
    // //                 postgres_db: String::from("postgres"),
    // //                 postgres_password: String::from("postgres"),
    // //                 postgres_user: String::from("postgres"),
    // //             },
    // //             volumes: vec![String::from("postgres_data:/var/lib/postgresql/data")],
    // //         }),
    // //     },
    // //     volumes: BTreeMap::new(),
    // // };
    // // compose_schema.volumes.insert("postgres_data".into(), None);

    // let contents = serde_norway::to_string(&compose_schema).unwrap();
    // println!("{}", contents);
    // fs::write("docker-compose.yaml", contents)?;
    let mut compose_file_schema = schema::ComposeFileSchema {
        services: BTreeMap::new(),
        volumes: BTreeMap::new(),
    };

    compose_file_schema
        .services
        .insert("postgres".into(), create_postgres_schema());

    write_compose_file(compose_file_schema)?;

    // Read compose.yaml file
    // let contents = fs::read_to_string("compose.yaml")?;
    // let values = serde_norway::from_str::<schema::ComposeFileSchema>(&contents);
    // if values.is_err() {
    //     println!("{:#?}", values);
    // }

    // if let Ok(v) = values {
    //     println!("{:#?}", v);
    // }

    Ok(())
}
