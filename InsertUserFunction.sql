DELIMITER $$
 
CREATE FUNCTION InsertUser(first_name varchar(40),
	last_name varchar(40), email varchar(40),
		password varchar(40))
			RETURNS boolean
    DETERMINISTIC
BEGIN
	DECLARE counter integer default 0;
    
    set counter = (SELECT count(*) FROM mathuser WHERE
    mathuser.email = email);
    
    IF counter > 0 THEN
		return false;
	END IF;
    
	INSERT INTO mathuser VALUES (first_name,
		last_name, email, password);
	
	return true;
END

